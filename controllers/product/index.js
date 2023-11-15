/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const products = require("../../dataFiles/newProducts");
const callFunctions = require("../../helper.js/callFunctions");
const vectorAggregation = require("../../helper.js/vectorAggregation");
const { getOpenAiEmbedding, chatCompletionWithFuncs, chatWithMessages } = require("../../libs/services/gpt");
const { createProduct } = require("../../libs/services/products");
const Product = require("../../models/Product");
const Chats = require("../../models/Chats")
const { OpenAI } = require("langchain/llms/openai");
const { MongoDBAtlasVectorSearch } = require("langchain/vectorstores/mongodb_atlas");
const { RetrievalQAChain, ConversationalRetrievalQAChain, LLMChain } = require("langchain/chains");
const llm = new OpenAI({
    modelName: "gpt-4"
});
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { MongoClient } = require("mongodb");
const { default: mongoose } = require("mongoose");
const { PromptTemplate } = require("langchain/prompts");
const { RunnableSequence, RunnableBranch } = require("langchain/schema/runnable");
const { StringOutputParser } = require("langchain/schema/output_parser");
const fs = require("fs");
const path = require("path");

const { BufferMemory } = require("langchain/memory");
const { HNSWLib } = require("langchain/vectorstores/hnswlib");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { formatDocumentsAsString } = require("langchain/util/document");
const makeChain = require("../../helper/makeChain");
const handleChatHistory = require("../../helper/product.helper");

const searchProduct = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const { searchTerm } = req.query;
            console.log("Seach", searchTerm)
            var gptResponse = await chatCompletionWithFuncs(searchTerm);
            var callFunctionReturned;
            if (gptResponse) {
                switch (gptResponse?.finish_reason) {
                    case 'function_call':
                        callFunctionReturned = await callFunctions(gptResponse?.message?.function_call?.name, gptResponse?.message?.function_call?.arguments, searchTerm)
                        break
                    case 'stop':
                        return resolve({
                            code: 200,
                            message: 'SUCCESS',
                            data: {
                                gptResponse: gptResponse?.message?.content,
                            }
                        });
                }
            }
            if (callFunctionReturned) {
                return resolve({
                    code: 200,
                    message: 'SUCCESS',
                    data: {
                        functionCalled: gptResponse?.message?.function_call?.name,
                        gptResponse: callFunctionReturned,

                    }
                });
            } else {
                // console.log("Error:", products)
                return resolve({
                    code: 500,
                    message: 'SERVER_ERROR'
                });
            }
        } catch (err) {
            console.log("Error:", err)
            return resolve({
                code: 500,
                message: 'SERVER_ERROR'
            });
        }
    });
}

const getSemanticSearch = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const { searchTerm } = req.query;
            const resp = await getOpenAiEmbedding(searchTerm)
            let searchEmbedding = resp?.data[0]?.embedding;
            const products = await Product.aggregate(vectorAggregation(searchEmbedding))
            // const products = await Product.find()

            // var pdfData = ''
            // products.forEach((product, index) => {
            //     pdfData = pdfData + 'Product ' + index + ': ' + product.gpt_desc
            // })

            if (products) {
                return resolve({
                    code: 200,
                    message: 'SUCCESS',
                    data: {
                        // pdfData: pdfData,
                        products: products
                    }
                });
            } else {
                return resolve({
                    code: 500,
                    message: 'SERVER_ERROR'
                });
            }
        } catch (err) {
            console.log("Error:", err)
            return resolve({
                code: 500,
                message: 'SERVER_ERROR'
            });
        }
    });
}

const getSingleEmbedding = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const { title, description, category, price, color } = req.query;
            const embdings = await getOpenAiEmbedding({ title: title, description: description, category: category, price: price, color: color })
            if (embdings) {

                return resolve({
                    code: 200,
                    message: 'New Embedding',
                    data: embdings
                });

            } else {
                return resolve({
                    code: 500,
                    message: 'SERVER_ERROR'
                });
            }
        } catch (err) {
            console.log("Error:", err)
            return resolve({
                code: 500,
                message: 'SERVER_ERROR'
            });
        }
    });
}

const insertProdWithGpt = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const promises = products.map(async (prod, index) => {
                const messages = [
                    { role: "system", content: `You are AI Assistant. This is the Product Detail : ${JSON.stringify(prod)} Don't miss any information` },
                    { role: "user", content: "Write a short description of the above product.  Don't miss any value of product information" }
                ];
                const resp = await chatWithMessages(messages);
                const product = await createProduct({
                    ...prod,
                    gpt_desc: resp?.message?.content
                });
                return product; // Return the product or some identifier to track success
            });

            const createdProducts = await Promise.all(promises);
            console.log("createdProducts", createdProducts)
            // Check if all products were successfully created
            console.log("allProductsCreated", createdProducts?.length === products?.length)
            if (createdProducts?.length === products?.length) {
                return resolve({
                    code: 200,
                    message: 'Products Created',
                });
            } else {
                return resolve({
                    code: 500,
                    message: 'SERVER_ERROR'
                });
            }
        } catch (err) {
            console.log("Error:", err)
            return resolve({
                code: 500,
                message: 'SERVER_ERROR'
            });
        }
    });
}

const searchProdWithLC = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const { searchTerm } = req.query
            console.log("ss", searchTerm)
            const client = await new MongoClient(process.env.DATABASE_URL);

            const collection = client.db('chatbox').collection('products');

            const vectorStore = new MongoDBAtlasVectorSearch(
                new OpenAIEmbeddings(),
                {
                    collection,
                    indexName: "default",
                    textKey: "gpt_desc",
                    embeddingKey: "embedding",
                }
            );
            // const resultOne = await vectorStore.similaritySearch(searchTerm, 5);
            // console.log("Hello", resultOne);
            // const chain = new ConversationChain({ llm: llm, memory: memory });
            const chain = ConversationalRetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
            console.log("Chain:", vectorStore.asRetriever())



            // const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
            // console.log("Chain:", vectorStore.asRetriever())

            const response1 = await chain.call({ query: searchTerm });
            console.log(response1);

            // const response1 = await chain.call({ input: "The Price of Camera is 30$ and sale price is 25.99$" });
            // console.log(response1);

            // const response2 = await chain.call({ input: "What is the Price of Cameras" });
            // console.log(response2);


            if (response1) {
                return resolve({
                    code: 200,
                    message: 'vectorStore',
                    vectorStore: {
                        // vectorStore: vectorStore,
                        // resultOne: resultOne,
                        response1: response1
                    }
                });
            } else {
                return resolve({
                    code: 500,
                    message: 'SERVERR_ERROR'
                });
            }
        } catch (err) {
            console.log("Error:", err)
            return resolve({
                code: 500,
                message: 'SERVER_ERROR'
            });
        }
    });
}

const searchRunnables = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const userId = req.jwt.id;
            // const { BufferMemory } = require("langchain/memory");
            const { MongoDBChatMessageHistory } = require("langchain/stores/message/mongodb");
            const { formatDocumentsAsString } = require("langchain/util/document");
            const { searchTerm, searchTerm2 } = req.query

            const client = await new MongoClient(process.env.DATABASE_URL);

            const collection = client.db('chatbox').collection('products');





            // const sessionId = mongoose.Types.ObjectId('654b3e83ac54041275bb45b2');
            // const chatHistory = new MongoDBChatMessageHistory({
            //     collection,
            //     sessionId,
            // });
            // const memory = new BufferMemory({
            //     memoryKey: "chat_history",
            //     returnMessages: true,
            //     chatHistory,
            // });
            const vectorStore = new MongoDBAtlasVectorSearch(
                new OpenAIEmbeddings(),
                {
                    collection,
                    indexName: "default",
                    textKey: "gpt_desc",
                    embeddingKey: "embedding",
                }
            );
            const retriever = vectorStore.asRetriever();
            const directory = path.join(__dirname, '../../dataFiles/');
            // const vectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings());
            const text = fs.readFileSync(path.join(__dirname, '../../dataFiles/Products_Descriptions.txt'), "utf-8");
            const oldChats = await Chats.findOne({ userId: userId })


            // await memory.saveContext({ input: searchTerm }, { output: res1.text });

            const formatChatHistory = (human, ai, index) => {
                const newInteraction = `Question ${index}: ${human}\nAI: ${ai}`;
                return newInteraction;

            };

            const questionPrompt = PromptTemplate.fromTemplate(
                `You are AI Assistant for my E-commerce Store. My customers will ask questions from you.You have to answer my customers from both chatHistory and Context. Make sure to satisfy my customer with your answer. Answer confidently and don't say sorry. 
                Also, if product name or sku is not directly mentioned in the Question then asnswer user from latest history
                ----------------
                CHAT HISTORY: {chatHistory}
                ----------------
                CONTEXT: {context}
                ----------------
                QUESTION: {question}
                ----------------
                Helpful Answer:`
            );
            var relevantDocs = []
            var serialized = ''
            const chain = RunnableSequence.from([
                {
                    question: (input) => {
                        return input.question
                    },
                    chatHistory: (input) => {
                        return input.chatHistory ?? ""
                    },
                    context: async (input) => {
                        relevantDocs = await retriever.getRelevantDocuments(input.question);
                        serialized = formatDocumentsAsString(relevantDocs);
                        return serialized;
                    },
                },
                questionPrompt,
                llm,
                new StringOutputParser(),
            ]);


            var chatHist = []
            if (oldChats) {
                chatHist = oldChats.chats.slice(oldChats.chats.length - 5, oldChats.chats.length).map((item, index) => formatChatHistory(item.human, item.ai, index + 1))
            }

            const resultOne = await chain.invoke({
                chatHistory: chatHist,
                question: searchTerm,
            });

            var result;
            if (oldChats) {
                result = await Chats.findOneAndUpdate(
                    { userId: mongoose.Types.ObjectId(userId) },
                    {
                        $push: {
                            chats: {
                                human: searchTerm,
                                ai: resultOne
                            }
                        }
                    },
                    { new: true }
                )
            }
            else {
                result = await Chats.create({
                    userId: userId,
                    chats: [
                        {
                            human: searchTerm,
                            ai: resultOne
                        }
                    ]
                })
            }

            if (resultOne) {
                return resolve({
                    code: 200,
                    message: 'vectorStore',
                    data: {
                        resultOne: resultOne,
                        relevantDocs: relevantDocs,
                        serialized: serialized,
                        // questionPrompt: questionPrompt,
                        chatHist: chatHist,
                        oldChats: oldChats
                    }
                });
            } else {
                return resolve({
                    code: 500,
                    message: 'SERVERR_ERROR'
                });
            }
        } catch (err) {
            console.log("Error:", err)
            return resolve({
                code: 500,
                message: 'SERVER_ERROR'
            });
        }
    });
}


const runnableWithPdf = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const userId = req.jwt.id;
            const { searchTerm } = req.query

            // const text = fs.readFileSync(path.join(__dirname, '../../dataFiles/Products_Descriptions.txt'), "utf-8");
            //To create Vector Store

            // const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
            // const docs = await textSplitter.createDocuments([text]);
            // const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
            // await vectorStore.save(directory);
            const directory = path.join(__dirname, '../../dataFiles/');
            const vectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings());
            const retriever = vectorStore.asRetriever();

            // const serializeChatHistory = (chatHistory) => {
            //     if (Array.isArray(chatHistory)) {
            //         return chatHistory.join("\n");
            //     }
            //     return chatHistory;
            // };

            const memory = new BufferMemory({
                memoryKey: "chatHistory",
            });

            const questionPrompt = PromptTemplate.fromTemplate(
                `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
            ----------------
            CHAT HISTORY: {chatHistory}
            ----------------
            CONTEXT: {context}
            ----------------
            QUESTION: {question}
            ----------------
            Helpful Answer:`
            );

            const questionGeneratorTemplate =
                PromptTemplate.fromTemplate(`Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
        ----------------
        CHAT HISTORY: {chatHistory}
        ----------------
        FOLLOWUP QUESTION: {question}
        ----------------
        Standalone question:`);
            //input : {
            //     question: string;
            //     context: string;
            //     chatHistory?: string | Array<string>;
            //   }

            const oldChats = await Chats.findOne({ userId: userId })
            const formatChatHistory = (human, ai) => {
                const newInteraction = `Human: ${human}\nAI: ${ai}`;
                return newInteraction;

            };
            var chatHist = []
            if (oldChats) {
                chatHist = oldChats.chats.slice(oldChats.chats.length - 5, oldChats.chats.length).map((item) => formatChatHistory(item.human, item.ai))
            }

            const handleProcessQuery = async (input) => {
                const chain = new LLMChain({
                    llm: llm,
                    prompt: questionPrompt,
                    outputParser: new StringOutputParser(),
                });
                console.log("Input in Handle Processing", input)

                const { text } = await chain.call({
                    ...input,
                    chatHistory: chatHist
                });

                await memory.saveContext(
                    {
                        human: input.question,
                    },
                    {
                        ai: text,
                    }
                );

                return text;
            };

            const answerQuestionChain = RunnableSequence.from([
                {
                    question: (input) => input.question,
                },
                {
                    question: (previousStepResult) => previousStepResult.question,
                    chatHistory: (previousStepResult) => {
                        return previousStepResult.chatHistory ?? ""
                    },
                    context: async (previousStepResult) => {
                        // Fetch relevant docs and serialize to a string.
                        const relevantDocs = await retriever.getRelevantDocuments(previousStepResult.question);
                        const serialized = formatDocumentsAsString(relevantDocs);
                        return serialized;
                    },
                },
                handleProcessQuery,
            ]);

            const generateQuestionChain = RunnableSequence.from([
                {
                    question: (input) => input.question,
                    chatHistory: async (input) => {
                        return input.chatHistory ?? "";
                    },
                },
                questionGeneratorTemplate,
                llm,
                {
                    question: (previousStepResult) =>
                        previousStepResult.text,
                },
                answerQuestionChain,
            ]);

            const branch = RunnableBranch.from([
                [
                    async () => {
                        const isChatHistoryPresent =
                            !!chatHist && chatHist.length;

                        return isChatHistoryPresent;
                    },
                    answerQuestionChain,
                ],
                [
                    async () => {
                        // const memoryResult = await memory.loadMemoryVariables({});
                        const isChatHistoryPresent =
                            !!chatHist && chatHist.length;

                        return isChatHistoryPresent;
                    },
                    generateQuestionChain,
                ],
                answerQuestionChain,
            ]);



            const fullChain = RunnableSequence.from([
                {
                    question: (input) => input.question,
                    chatHistory: (input) => {
                        return input.chatHistory
                    }

                },
                branch,
            ]);

            const resultOne = await fullChain.invoke({
                question: searchTerm,
                chatHistory: chatHist
            });

            // const resultTwo = await fullChain.invoke({
            //     question: "What was my last Question?",
            // });







            if (resultOne) {
                return resolve({
                    code: 200,
                    message: 'vectorStore',
                    data: {
                        resultOne: resultOne,
                        // resultTwo: resultTwo
                    }
                });
            } else {
                return resolve({
                    code: 500,
                    message: 'SERVERR_ERROR'
                });
            }
        } catch (err) {
            console.log("Error:", err)
            return resolve({
                code: 500,
                message: 'SERVER_ERROR'
            });
        }
    });
}


const searchWithRetrievelConv = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const userId = req.jwt.id;
            const { searchTerm } = req.query

            const client = await new MongoClient(process.env.DATABASE_URL);

            const collection = client.db('chatbox').collection('products');

            const sanitizedQuestion = searchTerm.trim().replaceAll('\n', ' ');

            console.log("sanitizedQuestion", sanitizedQuestion)

            const vectorStore = new MongoDBAtlasVectorSearch(
                new OpenAIEmbeddings(),
                {
                    collection,
                    indexName: "default",
                    textKey: "gpt_desc",
                    embeddingKey: "embedding",
                }
            );
            const retriever = vectorStore.asRetriever();
            const chain = makeChain(retriever);
            const oldChats = await Chats.findOne({ userId: userId })
            console.log("Old", oldChats)
            const pastMessages = oldChats?.chats
                ?.slice(-10)
                ?.reverse()
                ?.map(message => `Human: ${message.human}\nAssistant: ${message.ai}`)
                ?.join('\n');

            const resultOne = await chain.invoke({
                question: sanitizedQuestion,
                chat_history: pastMessages,
            });

            console.log("resultOne", resultOne)

            await handleChatHistory(oldChats, userId, searchTerm, resultOne)

            if (pastMessages) {
                return resolve({
                    code: 200,
                    message: 'vectorStore',
                    data: {
                        resultOne: resultOne,
                        pastMessages: pastMessages
                    }
                });
            } else {
                return resolve({
                    code: 500,
                    message: 'SERVERR_ERROR'
                });
            }
        } catch (err) {
            console.log("Error:", err)
            return resolve({
                code: 500,
                message: 'SERVER_ERROR'
            });
        }
    });
}

module.exports = {
    searchProduct,
    getSingleEmbedding,
    getSemanticSearch,
    insertProdWithGpt,
    searchProdWithLC,
    searchRunnables,
    runnableWithPdf,
    searchWithRetrievelConv
}
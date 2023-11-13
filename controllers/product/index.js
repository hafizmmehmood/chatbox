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
const { RetrievalQAChain, ConversationalRetrievalQAChain } = require("langchain/chains");
const llm = new OpenAI({
    modelName: "gpt-3.5-turbo"
});
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { MongoClient } = require("mongodb");
const { default: mongoose } = require("mongoose");
const { PromptTemplate } = require("langchain/prompts");
const { RunnableSequence } = require("langchain/schema/runnable");
const { StringOutputParser } = require("langchain/schema/output_parser");



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

            if (products) {
                return resolve({
                    code: 200,
                    message: 'SUCCESS',
                    data: {
                        length: products?.length,
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


            // await memory.saveContext({ input: searchTerm }, { output: res1.text });

            const formatChatHistory = (human, ai, previousChatHistory) => {
                const newInteraction = `Human: ${human}\nAI: ${ai}`;
                return newInteraction;

            };

            const questionPrompt = PromptTemplate.fromTemplate(
                `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.
                ----------------
                CONTEXT: {context}
                ----------------
                CHAT HISTORY: {chatHistory}
                ----------------
                QUESTION: {question}
                ----------------
                Helpful Answer:`
            );

            const chain = RunnableSequence.from([
                {
                    question: (input) => {
                        return input.question
                    },
                    chatHistory: (input) => {
                        return input.chatHistory ?? ""
                    },
                    context: async (input) => {
                        const relevantDocs = await retriever.getRelevantDocuments(input.question);
                        const serialized = formatDocumentsAsString(relevantDocs);
                        return serialized;
                    },
                },
                questionPrompt,
                llm,
                new StringOutputParser(),
            ]);

            const oldChats = await Chats.findOne({ userId: userId })
            var chatHist = []
            if (oldChats) {
                chatHist = oldChats.chats.map((item) => formatChatHistory(item.human, item.ai))
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
                        resultTwo: chatHist
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
    searchRunnables
}
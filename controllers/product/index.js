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
    modelName: "gpt-3.5-turbo",
    maxTokens: 1500,
});
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { MongoClient } = require("mongodb");
const { default: mongoose } = require("mongoose");
const { PromptTemplate } = require("langchain/prompts");
const { RunnableSequence } = require("langchain/schema/runnable");
const { StringOutputParser } = require("langchain/schema/output_parser");
const { ChatOpenAI } = require("langchain/chat_models/openai");

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
            global.ReadableStream = require("web-streams-polyfill").ReadableStream;
            console.log(process.env.GPT_KEY);
            const {
                BufferMemory,
            } = require("langchain/memory");
            const {
                MongoDBChatMessageHistory,
            } = require("langchain/stores/message/mongodb");
            const model = new ChatOpenAI({
                modelName: "gpt-3.5-turbo",
                openAIApiKey: process.env.GPT_KEY,
                temperature: 0,
            }); 
            const {
                MongoDBAtlasVectorSearch,
            } = require("langchain/vectorstores/mongodb_atlas");
            const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
            const { MongoClient, ObjectId } = require("mongodb");

        //   const namespace = "sample_mflix.products";
        //   const [dbName, collectionName] = namespace.split(".");
        //   const collection = await client.db(dbName).collection(collectionName);
      
            /////
            const { question } = req.query
            console.log("ss", question)
            const client = await new MongoClient(process.env.MONGODB_ATLAS_URI);//DATABASE_URL
            const collection = client.db('chatbox').collection('products');
            const historyCollection = client.db('chatbox').collection('histories');

            const vectorStore = new MongoDBAtlasVectorSearch(
                new OpenAIEmbeddings({ openAIApiKey: process.env.GPT_KEY }), //EMPTY FUNCTION PARAMS
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

            // const chain = ConversationalRetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
            // console.log("Chain:", vectorStore.asRetriever())
            const currentSession = req.jwt.id;
            const sessionId = new ObjectId(currentSession).toString();
            const chatHistory = new MongoDBChatMessageHistory({
                collection,
                sessionId,
            });
            const memory = new BufferMemory({
                memoryKey: "chat_history",
                returnMessages: true,
                chat_memory: chatHistory,
            });

            const chain = ConversationalRetrievalQAChain.fromLLM(
                model,
                vectorStore.asRetriever(),
                {
                    memory,
                }
            );
            chain.memory = memory;
            const res1 = await chain.invoke({
                question:question
            });
            console.log({ res1 });
            await memory.saveContext({ input: question }, { output: res1.text });
    //   return resolve({
    //     code: 200,
    //     message: "New Embedding",
    //     data: res1,
    //   });



            // const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
            // console.log("Chain:", vectorStore.asRetriever())
////////
            // const response1 = await chain.call({ query: searchTerm });
            // console.log(response1);

            // const response1 = await chain.call({ input: "The Price of Camera is 30$ and sale price is 25.99$" });
            // console.log(response1);

            // const response2 = await chain.call({ input: "What is the Price of Cameras" });
            // console.log(response2);


            if (res1) {
                return resolve({
                    code: 200,
                    message: 'vectorStore',
                    vectorStore: {
                        // vectorStore: vectorStore,
                        // resultOne: resultOne,
                        response1: res1
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

const searchRunnablesWithFaiss = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const userId = req.jwt.id;
            const { searchTerm } = req.query
            const { formatDocumentsAsString } = require("langchain/util/document");
            const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
            const { FaissStore } = require("langchain/vectorstores/faiss")
            const inputFilePath = "./client/public/ProductsDescriptions.pdf";
            const loader = new PDFLoader(inputFilePath);
            const doc = await loader.loadAndSplit();

            const vectorStore = await FaissStore.fromDocuments(doc, new OpenAIEmbeddings())
            const retriever = vectorStore.asRetriever();

            const formatChatHistory = (human, ai, previousChatHistory) => {
                const newInteraction = `Human: ${human}\nAI: ${ai}`;
                return newInteraction;

            };

            const questionPrompt = PromptTemplate.fromTemplate(
                `Use the following pieces of context to answer the question at the end. If question is about least expensive or most expensive product. Use the context in all those ways, where is the possibility to find desired answer. You are not supposed to say sorry.
                ----------------
                CONTEXT: {context}
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
                    // chatHistory: (input) => {
                    //     return input.chatHistory ?? ""
                    // },
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
                // chatHistory: chatHist.slice(-30),
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
            console.log(result);
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
                        question: searchTerm,
                        response: resultOne,
                        history: chatHist
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

const searchRunnablesGenerativeAgents = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const userId = req.jwt.id;
            const { searchTerm } = req.query
            const { OpenAI } = require("langchain/llms/openai");
            const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
            const { MemoryVectorStore } = require("langchain/vectorstores/memory");
            const { formatDocumentsAsString } = require("langchain/util/document");
            const { TimeWeightedVectorStoreRetriever } = require("langchain/retrievers/time_weighted");
            const { GenerativeAgentMemory, GenerativeAgent }= require("langchain/experimental/generative_agents");
            const client = await new MongoClient(process.env.DATABASE_URL);

            const collection = client.db('chatbox').collection('products');
            const llm = new OpenAI({
                modelName: "gpt-4",
                temperature: 0.9,
                maxTokens: 1500,
            });
            const createNewMemoryRetriever = async () => {
                // Create a new, demo in-memory vector store retriever unique to the agent.
                // Better results can be achieved with a more sophisticatd vector store.
                const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());
                const retriever = new TimeWeightedVectorStoreRetriever({
                    vectorStore,
                    // otherScoreKeys: ["importance"],
                    // k: 15,
                });
                return retriever;
            };
              
            // Initializing AI
            const AIMemory = new GenerativeAgentMemory(
                llm,
                await createNewMemoryRetriever(),
                { reflectionThreshold: 8 }
            );
              
            const MemoryRetriever = async (input) => {
                const vectorStore = new MongoDBAtlasVectorSearch(new OpenAIEmbeddings(), {
                    collection,
                    indexName: "default",
                    textKey: "gpt_desc",
                    embeddingKey: "embedding",
                });
                const retriever = vectorStore.asRetriever();
                const rels= await retriever.getRelevantDocuments(input);
                return rels;
            };
            const AI = new GenerativeAgent(llm, AIMemory, {
                name: "AI"});
                
            const relevantDocs = await MemoryRetriever(searchTerm);
            const AIObservations = formatDocumentsAsString(relevantDocs);
            
            const formatChatHistory = (human, ai) => {
                const newInteraction = `Human: ${human}\nAI: ${ai}`;
                return newInteraction;

            };

            const questionPrompt = PromptTemplate.fromTemplate(
                `Use the following pieces of context to answer the question at the end. Consider it as your inventory. If question is about something you dont have in context then simply say it is not in stock. If you don't know the answer, just say that you don't know, don't try to make up an answer.
                ----------------
                CONTEXT: {context}
                ----------------
                CHAT HISTORY: {chatHistory}
                ----------------
                QUESTION: {question}
                ----------------
                Helpful Answer:`
            );

            const oldChats = await Chats.findOne({ userId: userId })
            var chatHist = []
            if (oldChats) {
                chatHist = oldChats.chats.slice(-20).map((item) => formatChatHistory(item.human, item.ai))
            }
            const chain = RunnableSequence.from([
                {
                    question: (input) => {
                        return input.question
                    },
                    context: async (input) => {
                        await AI.addMemory(AIObservations);
                        const response = await AI.generateDialogueResponse(input.question);
                        return response[1];
                    },
                    chatHistory: (input) => {
                        return input.chatHistory ?? ""
                    },
                },
                questionPrompt,
                llm,
                new StringOutputParser(),
            ]);
            
            // const response = await AI.generateDialogueResponse(searchTerm);
            // const resp = response[1];  
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

                
            return resolve({
                code: 200,
                message: 'success',
                data: resultOne
            });
            
        } catch (err) {
            console.log("Error:", err)
            return resolve({
                code: 500,
                message: 'SERVER_ERROR'
            });
        }
    });
}

const searchWithPinecone = async (req) => {
    return new Promise(async (resolve) => {
        try {
            const userId = req.jwt.id;
            const { searchTerm } = req.query;
            const PineconeClient = require("@pinecone-database/pinecone").Pinecone;
            const Pinecone = new PineconeClient({
                apiKey : process.env.PINECONE_API_KEY,
                environment : process.env.PINECONE_ENVIRONMENT
            });

            const { loadQAStuffChain } =require("langchain/chains");
            const { Document } = require("langchain/document");
            const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
            const inputFilePath = "./client/public/ProductsDescriptions.pdf";
            const loader = new PDFLoader(inputFilePath);
            const pages = await loader.load();

            const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
            const indexName = "products-index";
            // const existingIndexes = await Pinecone.listIndexes();
            // console.log(existingIndexes, "existing indexes");

            // if (!existingIndexes.includes(indexName)) {
            //       console.log(`Creating "${indexName}"...`);
            //       const createClient = await Pinecone.createIndex({
            //           name: indexName,
            //           dimension: 1536,
            //           metric: "cosine",
            //       });
            //       console.log(`Created with client:`, createClient);
            //       await new Promise((resolve) => setTimeout(resolve, 60000));
            // } else {
            //       console.log(`"${indexName}" already exists.`);
            // }
            const index = Pinecone.Index(indexName);
            for (const doc of pages) {
                const txtPath = doc.metadata.source;
                const text = doc.pageContent;
                const text_splitter = new RecursiveCharacterTextSplitter({
                    chunk_size: 1000,
                    chunk_overlap: 200,
                })
                
                // const docs = text_splitter.splitDocuments(pages);
                const chunks = await text_splitter.createDocuments([text]);
                const embeddingsArrays = await new OpenAIEmbeddings().embedDocuments(
                chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
                );
                console.log("Finished embedding documents");
                console.log(
                    `Creating ${chunks.length} vectors array with id, values, and metadata...`
                );
                // 9. Create and upsert vectors in batches of 100
                const batchSize = 100;
                let batch = [];
                for (let idx = 0; idx < chunks.length; idx++) {
                    const chunk = chunks[idx];
                    const vector = {
                        id: `${txtPath}_${idx}`,
                        values: embeddingsArrays[idx],
                        metadata: {
                            ...chunk.metadata,
                            loc: JSON.stringify(chunk.metadata.loc),
                            pageContent: chunk.pageContent,
                            txtPath: txtPath,
                        },
                    };
                    batch.push(vector);
                    // When batch is full or it's the last item, upsert the vectors
                    if (batch.length === batchSize || idx === chunks.length - 1) {
                        await index.upsert(batch)
                        // Empty the batch
                        batch = [];
                    }
                }
                // 10. Log the number of vectors updated
                console.log(`Pinecone index updated with ${chunks.length} vectors`);
            }
            const queryEmbedding = await new OpenAIEmbeddings().embedQuery(searchTerm);
            let queryResponse = await index.query({
                    topK: 10,
                    vector: queryEmbedding,
                    includeMetadata: true,
                    includeValues: true,
            });
            console.log(`Found ${queryResponse.matches.length} matches...`);
            console.log(`Asking question: ${searchTerm}...`);
            let result;
            if (queryResponse.matches.length) {
                const chain = loadQAStuffChain(llm);
                const concatenatedPageContent = queryResponse.matches
                    .map((match) => match.metadata.pageContent)
                    .join(" ");
                result = await chain.call({
                    input_documents: [new Document({ pageContent: concatenatedPageContent })],
                    question: searchTerm,
                });
                console.log(`Answer: ${result.text}`);
            } else {
                console.log("There are no matches");
            }

            return resolve({
                code: 200,
                message: 'success',
                data: result
            });
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
    searchRunnablesWithFaiss,
    searchRunnablesGenerativeAgents,
    searchWithPinecone
}
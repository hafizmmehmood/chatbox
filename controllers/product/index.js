/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const products = require("../../dataFiles/newProducts");
const callFunctions = require("../../helper.js/callFunctions");
const vectorAggregation = require("../../helper.js/vectorAggregation");
const { getOpenAiEmbedding, chatCompletionWithFuncs, chatWithMessages } = require("../../libs/services/gpt");
const { createProduct } = require("../../libs/services/products");
const Product = require("../../models/Product");

const { OpenAI } = require("langchain/llms/openai");
const { MongoDBAtlasVectorSearch } = require("langchain/vectorstores/mongodb_atlas");
const { RetrievalQAChain } = require("langchain/chains");
const llm = new OpenAI({
    modelName: "gpt-3.5-turbo"
});
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { MongoClient } = require("mongodb");  
const {
    HttpStatusCode,
    GenericMessages,
  } = require('../../constants');




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
                    indexName: "default", // The name of the Atlas search index. Defaults to "default"
                    textKey: "gpt_desc", // The name of the collection field containing the raw content. Defaults to "text"
                    embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
                }
            );
            const resultOne = await vectorStore.similaritySearch(searchTerm, 5);
            console.log("Hello", resultOne);
            // const chain = new ConversationChain({ llm: llm, memory: memory });

            const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
            console.log("Chain:", vectorStore.asRetriever())

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
                        resultOne: resultOne,
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
const searchProductFunc = (req) => {
    return new Promise((resolve, reject) => {
      try {
                const { question } =
                  req?.query || "";
                global.ReadableStream = require("web-streams-polyfill").ReadableStream;
                console.log(process.env.GPT_KEY);
                // const { OpenAI } = require("langchain/llms/openai");
                const { ChatOpenAI } = require("langchain/chat_models/openai");
                const {
                //   RetrievalQAChain,
                //   ConversationChain,
                  ConversationalRetrievalQAChain,
                } = require("langchain/chains");
                const {
                  BufferMemory,
                //   ConversationSummaryMemory,
                //   CombinedMemory,
                } = require("langchain/memory");
                //     const bufferMemory = new BufferMemory({
                //       memoryKey: "chat_history_lines",
                //       inputKey: "input",
                //     });
          
                //   //   // summary memory
                //     const summaryMemory = new ConversationSummaryMemory({
                //       llm: new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 }),
                //       inputKey: "input",
                //       memoryKey: "conversation_summary",
                //     });
          
                //     //
                //     const memory = new CombinedMemory({
                //       memories: [bufferMemory, summaryMemory],
                //     });
                const memory = new BufferMemory({
                  memoryKey: "chat_history",
                  returnMessages: true,
                });
                const {
                  MongoDBAtlasVectorSearch,
                } = require("langchain/vectorstores/mongodb_atlas");
                // const { MemoryVectorStore } = require("langchain/vectorstores/memory");
                const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
                const { MongoClient } = require("mongodb");
          
                const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
                console.log(memory);
                const namespace = "sample_mflix.products";
                const [dbName, collectionName] = namespace.split(".");
                const collection = client.db(dbName).collection(collectionName);
                const vectorStore = new MongoDBAtlasVectorSearch(
                  new OpenAIEmbeddings({ openAIApiKey: process.env.GPT_KEY }),
                  {
                    collection,
                    indexName: "default", // The name of the Atlas search index. Defaults to "default"
                    textKey: "detail", //    name of the collection field containing the raw content. Defaults to "text"
                    embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
                  }
                );
                //   console.log(vectorStore);
                //   const resultOne = await vectorStore.maxMarginalRelevanceSearch(
                //     "Hello world",
                //     {
                //       k: 4,
                //       fetchK: 20, // The number of documents to return on initial fetch
                //     }
                //   );
                //   console.log(resultOne);
          
                //   // Using MMR in a vector store retriever
          
                //   const retriever = await vectorStore.similaritySearchWithScore(
                //     "find product with category Kitchen and color should be black or silver but not white",
                //     3
                //   );
                //   const vectorStore1 = await MemoryVectorStore.fromTexts(
                //     [
                //       "Silver cup price 200 category kitchen",
                //       "black watch 300 price social",
                //       "white shoes 500 price footwear",
                //     ],
                //     [{ id: 2 }, { id: 1 }, { id: 3 }],
                //     new OpenAIEmbeddings({ openAIApiKey: process.env.GPT_KEY })
                //   );
                //   console.log(vectorStore1.asRetriever());
                const model = new ChatOpenAI({
                  modelName: "gpt-3.5-turbo",
                  openAIApiKey: process.env.GPT_KEY,
                });
                //   console.log(vectorStore.asRetriever());
                const chain = ConversationalRetrievalQAChain.fromLLM(
                  model,
                  vectorStore.asRetriever(),
                  {
                    memory,
                  }
                );
          
                chain.call({
                  question: question || "please suggest any other coffoe product?",
                }).then((response) => {          
                //   const retrieverOutput = await retriever.getRelevantDocuments("silver");
          
                //   console.log(retrieverOutput);
                //   const llm = new OpenAI({
                //     openAIApiKey: process.env.GPT_KEY,
                //     // temperature: 0.9,
                //   });
                //   const chatModel = new ChatOpenAI({ openAIApiKey: process.env.GPT_KEY });
          
                //   const text =
                //     "What would be a good company name for a company that makes colorful socks?";
          
                //   const llmResult = await llm.predict(text);
                //   console.log(llmResult);
                /*
              "Feetful of Fun"
            */
          
                //   const chatModelResult = await chatModel.predict(text);
                //   console.log(chatModelResult);
                
        
          return resolve({
            code: HttpStatusCode.OK,
            data: response,
            message: "New Embedding"
          });}).catch((err)=> {
            console.log(err, "err");
            return reject({
                code: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: GenericMessages.INTERNAL_SERVER_ERROR,
                data:err,
              });
          })
      } catch (error) {
        return reject({
          code: HttpStatusCode.INTERNAL_SERVER_ERROR,
          message: GenericMessages.INTERNAL_SERVER_ERROR
        });
      }
    });
  };
module.exports = {
    searchProduct,
    getSingleEmbedding,
    getSemanticSearch,
    insertProdWithGpt,
    searchProdWithLC,
    searchProductFunc
}
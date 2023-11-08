  const {
    HttpStatusCode,
    GenericMessages,
  } = require('../../constants');

  /**
   * @Route Get /admin/superAdmin
   * @dev Create Super admin.
   */
  exports.searchProduct = (req) => {
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

  
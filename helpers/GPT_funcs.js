const { getOpenAiEmbedding, chatWithMessages } = require("../libs/services/gpt");
const Product = require("../models/Product");
const vectorAggregation = require("./vectorAggregation");
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const Chats = require("../models/Chats")
const { MongoDBAtlasVectorSearch } = require("langchain/vectorstores/mongodb_atlas");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { MongoClient } = require("mongodb");
const makeChain = require("../helper/makeChain");
const handleChatHistory = require("../helper/product.helper");

const GetProducInfo = async (searchTerm) => {
    const resp = await getOpenAiEmbedding(searchTerm)
    let searchEmbedding = resp?.data[0]?.embedding;
    const products = await Product.aggregate(vectorAggregation(searchEmbedding))

    console.log("Products", products)
    let messages = []
    if (products?.length) {
        messages = [
            { role: "system", content: `You are AI Assistant to answer my Customer. This is the Product Detail : ${JSON.stringify(products[0])},  Only answer from Provided Product. If you don't know answer, say sorry!` },
            { role: "user", content: searchTerm }
        ]
    }
    else {
        messages = [
            { role: "system", content: `You are AI Assistant to answer my customer. Appologize from the user that the product user is talking in not currently available in our store` },
            { role: "user", content: searchTerm }
        ]
    }


    console.log("Messages:", messages)

    const gptResp = await chatWithMessages(messages)
    if (gptResp) {
        return gptResp?.message?.content
    }
    else {
        console.log("gpt res:", gptResp)
        return false
    }
}

const GetProducRange = async (args) => {
    const queryData = JSON.parse(args)
    console.log("Query Data  ", typeof (parseInt(queryData?.min)), parseInt(queryData?.min))


    let rangedAggregation = [
        {
            $match: {
                price: { $gte: parseInt(queryData?.min), $lte: parseInt(queryData?.max) }
            }
        }
    ]
    console.log("Product:", queryData?.product)
    if (queryData?.product) {
        const resp = await getOpenAiEmbedding(queryData?.product)
        let searchEmbedding = resp?.data[0]?.embedding;
        rangedAggregation.unshift(...vectorAggregation(searchEmbedding))
    }

    console.log("rangedAggregation", rangedAggregation)
    const rangedProduct = await Product.aggregate(rangedAggregation)

    // let messages = [
    //     { role: "system", content: `This is the Products Detail : ${JSON.stringify(rangedProduct)}, You are AI Assistant to answer my Customer. Only answer from Provided Product. If you don't know answer, say sorry!` },
    //     { role: "user", content: searchTerm }
    // ]
    // console.log("ranged Prod", rangedProduct)
    return rangedProduct

    // const gptResp = await chatWithMessages(messages)
    // if (gptResp) {
    //     return gptResp?.message?.content
    // }
    // else {
    //     console.log("gpt res:", gptResp)
    //     return false
    // }
}

const AskUserToRefineQuery = async (searchTerm) => {

    let messages = [
        { role: "system", content: `You are AI Assistant to answer my customer. If user does not mention anything related to Product like name, color, category, price range etc, ask him to search again with anything relevant to product detail as we cannot fetch product without anything related to product` },
        { role: "user", content: searchTerm }
    ]

    console.log("Messages", messages)

    const gptResp = await chatWithMessages(messages)
    if (gptResp) {
        return gptResp?.message?.content
    }
    else {
        console.log("gpt res:", gptResp)
        return false
    }
}

const retrievalConv = async (searchTerm, userId) => {
    return new Promise(async (resolve) => {
        try {
            const client = await new MongoClient(process.env.DATABASE_URL);
            const workspaceId = 200;
            const db = client.db('chatbox');
            const collection = db.collection('products');
            const collectionFiltered = await collection.find({workspaceId:workspaceId}).toArray();
            const newCollection = db.collection("worksapce_products");
            await newCollection.deleteMany({workspaceId: workspaceId});
            await newCollection.insertMany(collectionFiltered);
            // await newCollection.createIndex(
            //     {
            //       "gpt_desc": "knn",
            //     },
            //     {
            //       "name": "gptDescIndex",
            //       "weights": {
            //         "gpt_desc": 1,
            //       },
            //       "knn": {
            //         "key": "embedding",
            //         "dimension": 1536,
            //         "algorithm": "cosine",
            //       },
            //     }
            //   );
              

            const sanitizedQuestion = searchTerm.trim().replaceAll('\n', ' ');
            console.log("sanitizedQuestion", sanitizedQuestion);
            const vectorStore = new MongoDBAtlasVectorSearch(
                new OpenAIEmbeddings(),
                {
                    collection: collection,
                    indexName: "default",
                    textKey: "gpt_desc",
                    embeddingKey: "embedding",
                }
            );

            const retriever = vectorStore.asRetriever();
            const chain = makeChain(retriever);
            const oldChats = await Chats.findOne({ userId: userId })
            // console.log("Old", oldChats)
            const pastMessages = oldChats?.chats
            ?.slice(-10)
            ?.reverse()
            ?.map(message => `Human: ${message.human}\nAssistant: ${message.ai}`)
            ?.join('\n');
            console.log(pastMessages, "pastMessages");
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
                        question: searchTerm,
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

module.exports = { GetProducInfo, GetProducRange, AskUserToRefineQuery, retrievalConv }
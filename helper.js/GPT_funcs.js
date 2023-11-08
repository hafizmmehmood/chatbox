const { getOpenAiEmbedding, chatWithMessages } = require("../libs/services/gpt");
const Product = require("../models/Product");
const vectorAggregation = require("./vectorAggregation");

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
        { role: "system", content: `You are AI Assistant to answer my customer. If user does not mention the Product, ask him to search again with the product name as we cannot fetch product without product name mentioned` },
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
module.exports = { GetProducInfo, GetProducRange, AskUserToRefineQuery }
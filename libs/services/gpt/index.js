const axios = require("axios");
const gptFuctions = require("../../../helpers/gpt_helper");
// const { createQuestion, updateQuestion, getQuestions } = require("../questions");
console.log("got URL", process.env.GPT_URL)
const getOpenAiEmbedding = async (data) => {

    try {
        let embedding = await axios.post(`${process.env.GPT_URL}/embeddings`,
            {
                input: data,
                model: "text-embedding-ada-002",
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                }
            });
        console.log("Embedding", embedding?.data?.data[0]?.embedding)
        return embedding?.data?.data[0]?.embedding;
    } catch (err) {
        console.log("Get Embedding Api error", err?.response?.data?.error);
        return err;
    }
}


const chatCompletionWithFuncs = async (searchTerm) => {
    try {
        let resp = await axios.post(`${process.env.GPT_URL}/chat/completions`,
            {
                model: "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": searchTerm }],
                functions: gptFuctions,
                "function_call": "auto"
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                }
            });
        console.log("Fisnish Reosone", resp?.data?.choices[0]?.finish_reason)
        return resp?.data?.choices[0];
    } catch (err) {
        console.log("Error in Chat Completion", err?.response?.data?.error);
        return err;
    }
}

const chatWithMessages = async (messages) => {
    try {
        let resp = await axios.post(`${process.env.GPT_URL}/chat/completions`,
            {
                model: "gpt-3.5-turbo",
                messages: messages,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                }
            });
        console.log("resp", resp?.data?.choices[0])
        return resp?.data?.choices[0]?.message?.content;
    } catch (err) {
        console.log("Error in Chat Completion", err?.response?.data?.error);
        return err;
    }
}

module.exports = {
    getOpenAiEmbedding,
    chatCompletionWithFuncs,
    chatWithMessages,
    // chatWithPrevMsg
}
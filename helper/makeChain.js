const { ChatOpenAI } = require('langchain/chat_models/openai');
const { ChatPromptTemplate } = require('langchain/prompts');
const { RunnableSequence } = require('langchain/schema/runnable');
const { StringOutputParser } = require('langchain/schema/output_parser');

const CONDENSE_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.
<chat_history>
  {chat_history}
</chat_history>

Follow Up Input: {question}
Standalone question:`;

const QA_TEMPLATE = `You are an expert researcher. Use the following pieces of context to answer the question at the end.
If you don't know the answer, Ask user to elaborate the query more.
If the question is not related to the context or chat history, politely respond that "Looks like the product you mentioned is not available in our store. Please elaborate your query more So that I can find best product for you. I am sorry for inconvenience"

<context>
  {context}
</context>

<chat_history>
  {chat_history}
</chat_history>

Question: {question}
Helpful answer in markdown:`;

const combineDocumentsFn = (docs, separator = '\n\n') => {
    console.log("3")
    const serializedDocs = docs.map((doc) => doc.pageContent);
    return serializedDocs.join(separator);
};

const makeChain = (retriever) => {

    const condenseQuestionPrompt = ChatPromptTemplate.fromTemplate(CONDENSE_TEMPLATE);
    const answerPrompt = ChatPromptTemplate.fromTemplate(QA_TEMPLATE);

    const model = new ChatOpenAI({
        temperature: 0,
        modelName: 'gpt-3.5-turbo-1106'
    });

    // Rephrase the initial question into a dereferenced standalone question based on
    // the chat history to allow effective vectorstore querying.


    const standaloneQuestionChain = RunnableSequence.from([
        condenseQuestionPrompt,
        model,
        new StringOutputParser(),
    ]);



    // Retrieve documents based on a query, then format them.
    const retrievalChain = retriever.pipe(combineDocumentsFn);



    // Generate an answer to the standalone question based on the chat history
    // and retrieved documents. Additionally, we return the source documents directly.
    const answerChain = RunnableSequence.from([
        {
            context: RunnableSequence.from([
                (input) => input.question,
                retrievalChain,
            ]),
            chat_history: (input) => {

                return input.chat_history
            },
            question: (input) => {
                console.log("2")
                return input.question
            },
        },
        answerPrompt,
        model,
        new StringOutputParser(),
    ]);



    // First generate a standalone question, then answer it based on
    // chat history and retrieved context documents.
    const conversationalRetrievalQAChain = RunnableSequence.from([
        {
            question: () => {
                console.log("1")
                // console.log("1:", standaloneQuestionChain)
                return standaloneQuestionChain
            },
            chat_history: (input) => {
                // console.log("1+", input?.chat_history)

                return input.chat_history
            },
        },
        answerChain,

    ]);

    return conversationalRetrievalQAChain;

};

module.exports = makeChain
const vectorAggregation = (searchEmbedding) => {
    return [
        {
            $vectorSearch: {
                queryVector: searchEmbedding,
                path: "embedding",
                numCandidates: 100,
                limit: 5,
                index: "default",
            },
        },
        {
            $project: {
                title: 1,
                description: 1,
                color: 1,
                category: 1,
                price: 1,
                sale_price: 1,
                score: { $meta: "vectorSearchScore" }
            }
        },
        // {
        //     $match: {
        //         score: { $gt: 0.90 },  // Filter documents with score greater than 90,
        //     }
        // },
    ]
}

module.exports = vectorAggregation
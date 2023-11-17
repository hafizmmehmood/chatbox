const gptFuctions = [

    {
        "name": "product_info",
        "description": "Suggest products with expected Color Category or Price Range mentioned. Or general questions.",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "product_info_without_product",
        "description": "Product info with No Product name color category or price mentioned",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
]

module.exports = gptFuctions;

// {
//     "name": "get_products_range",
//     "description": "Get the min and max value of range",
//     "parameters": {
//         "type": "object",
//         "properties": {
//             "min": {
//                 "type": "string",
//                 "description": "The min value from range"
//             },
//             "max": {
//                 "type": "string",
//                 "description": "The max value from range"
//             },
//             "product": {
//                 "type": "string",
//                 "description": "The product which user is talking about"
//             }
//         },
//         "required": [
//             "min",
//             "max",
//             "product"
//         ]
//     }
// },
// {
//     "name": "get_products_info",
//     "description": "Get Information about the product",
//     "parameters": {
//         "type": "object",
//         "properties": {
//             "product_Name": {
//                 "type": "string",
//                 "description": "The product Name"
//             },
//             "product_color": {
//                 "type": "string",
//                 "description": "Color of product"
//             }
//         },
//         "required": [
//             "product_Name",
//             "product_color",
//         ]
//     }
// },
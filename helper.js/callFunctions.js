const { GetProducInfo, GetProducRange, AskUserToRefineQuery } = require("./GPT_funcs")

const callFunctions = async (funcName, args, searchTerm) => {
    console.log("Func Name", funcName)
    switch (funcName) {
        case 'get_products_info':
            return await GetProducInfo(searchTerm)
        case 'get_products_range':
            return await GetProducRange(args, searchTerm)
        case 'product_info_without_product':
            return await AskUserToRefineQuery(searchTerm)
    }
}

module.exports = callFunctions
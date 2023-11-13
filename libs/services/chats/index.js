const Chats = require('../../../models/Chats')
const createChat = async (obj) => {
    let newChat = await Chats.create(obj);
    if (newChat) {
        return newChat;
    } else {
        return false;
    }
}

module.exports = createChat
const { default: mongoose } = require("mongoose");
const Chats = require("../models/Chats");

const handleChatHistory = async (oldChats, userId, searchTerm, resultOne) => {
    console.log("Old Chats", oldChats?.length)
    if (oldChats) {
        const result = await Chats.findOneAndUpdate(
            { userId: mongoose.Types.ObjectId(userId) },
            {
                $push: {
                    chats: {
                        human: searchTerm,
                        ai: resultOne
                    }
                }
            },
            { new: true }
        )
        return result
    }
    else {
        const result = await Chats.create({
            userId: userId,
            chats: [
                {
                    human: searchTerm,
                    ai: resultOne
                }
            ]
        })
        return result
    }
}

module.exports = handleChatHistory
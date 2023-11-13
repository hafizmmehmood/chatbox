const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chatsSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    chats: { type: Array }
})

// chatsSchema.virtual("user", {
//     ref: "User",
//     localField: "userId",
//     foreignField: "_id"
// });

const Chats = mongoose.model('Chats', chatsSchema);
module.exports = Chats
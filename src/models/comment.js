import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: 280
    },
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timetamp: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
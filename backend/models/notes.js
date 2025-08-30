import mongoose from "mongoose";
const Schema = mongoose.Schema;
const noteSchema = new mongoose.Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

export const Note = mongoose.model("Note", noteSchema);
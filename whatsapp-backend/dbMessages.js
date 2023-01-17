import mongoose from "mongoose";

const { Schema } = mongoose;

// Defining data scheme

const whatsappSchema = new Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

// Collection
export default mongoose.model('messagecontents', whatsappSchema);
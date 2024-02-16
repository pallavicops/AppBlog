import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    blogs:[{type: mongoose.Types.ObjectId, ref: 'Blog',required: true}],
});

export default mongoose.model('User', userSchema);
//userSchema is a schema object that will be used to define the structure of documents in the collection.



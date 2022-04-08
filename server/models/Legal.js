import mongoose from "mongoose";


const Legal = new mongoose.Schema({
    idClient: {type: String, required:true},
    title: {type:String,required:true},
    inn: {type:String,required:true,unique:true},
    communalType:{type:String}
})

export default mongoose.model('Legal',Legal)
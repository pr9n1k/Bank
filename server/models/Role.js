import mongoose from "mongoose"
const Role = new mongoose.Schema({
    title:{type:String,unique:true,required:true},
    value:{type:String,unique:true,required:true}
})

export default mongoose.model('Role',Role);
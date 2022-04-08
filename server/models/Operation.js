
import mongoose from 'mongoose';

const Operation = new mongoose.Schema({
    idEmployee:{type:String,required:true},
    numberAccount:{type:String,required:true},
    accountDepartment:{type:String,required:true},
    type:{type:String,required:true},
    date:{type:String,required:true},
    number:{type:String,required:true,unique:true},
    money:{type:String,required:true},
    currency:{type:String,required:true},
    isConfirm:{type:Boolean,required:true,default:false},
    fullName:{type:String,required:true},
    inn:{type:String,required:true},
    pasport:{type:String},
    purpose:{type:String}
})

export default mongoose.model('Operation',Operation);
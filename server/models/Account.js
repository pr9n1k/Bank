import mongoose from "mongoose";


const Account = new mongoose.Schema({
    idObject:{type:String,required:true},
    number:{type:String,required:true,unique:true},
    value: [{
        currency:{type:String,required:true},
        money:{type:String,default:'0'},
    }]
})

export default mongoose.model('Account',Account);
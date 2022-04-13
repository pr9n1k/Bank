import mongoose from "mongoose";


const Encashment = new mongoose.Schema({
    date:{type:String,required:true},
    idDepartment:{type:String,required:true},
    idOperator:{type:String,required:true},
    idCashier:{type:String},
    isAdmin:{type:Boolean,default:false},
    isCashier:{type:Boolean,default:false},
    type:{type:String,required:true},
    value:[{
        currency:{type:String,require:true},
        money:{type:String,require:true}
    }]
})

export default mongoose.model('Encashment',Encashment)
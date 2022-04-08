import mongoose from "mongoose";



const Communal = new mongoose.Schema({
    number:{type:String,required:true,unique:true},
    idEmployee:{type:String,required:true},
    accountDepartment:{type:String,required:true},//-
    date: {type:String, required:true},
    city: {type:String,required:true},
    street: {type:String,required:true},
    house: {type:String,required:true},
    flat: {type:String},
    fullName: {type:String,required:true},
    communals:[{
        title:{type:String,required:true},
        accountCommunal:{type:String,required:true},//-
        startDate:{type:String},
        endDate:{type:String},
        startCounter: {type:String},
        endCounter: {type:String},
        money:{type:String,required:true}
    }]
})

export default mongoose.model('Communal',Communal);
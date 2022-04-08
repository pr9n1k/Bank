import mongoose from "mongoose";

const Client = new mongoose.Schema({
    name:{type:String, required: true},
    patronymic:{type:String, required: true},
    surname:{type:String, required: true},
    sex:{type:String, required: true},
    phone:{type:String, required: true},
    birthDay:{type:String, required: true},
    inn:{type:String, required: true, unique:true},
    city:{type:String, required: true},
    street:{type:String, required: true},
    house:{type:String, required: true},
    flat:{type:String},
    series:{type:String, required: true},
    number:{type:String, required: true},
    issued:{type:String, required: true},
    issuedDate:{type:String, required: true}
})

export default mongoose.model('Client',Client);
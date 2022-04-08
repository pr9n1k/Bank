import mongoose from "mongoose";

const Employee = new mongoose.Schema({
    idDepartment:{type:String, default: 'not'},
    name:{type:String, required: true},
    patronymic:{type:String},
    surname:{type:String, required: true},
    login:{type:String, required: true, unique: true},
    password:{type:String, required: true},
    phone:{type:String, required: true,unique:true},
    role:{type:String, ref: 'Role'},
})

export default mongoose.model('Employee',Employee);
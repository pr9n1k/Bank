import mongoose from "mongoose";


const Departament = new mongoose.Schema({
    number: {type:String,required:true,unique:true},
    city: {type:String,required:true}
})

export default mongoose.model('Departament',Departament);
import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    name:{type:String ,required:true},
    email:{type:String ,required :true},
    password1:{type:String,required:tru}, // this one is to counter the error in frontend
    id:{type:String}
})
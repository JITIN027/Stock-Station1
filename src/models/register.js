const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const registerSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})
registerSchema.pre("save",async function(next){
    this.password=bcrypt.hash(this.password,10);
    next();
})


const Register=new mongoose.model("registered",registerSchema);
module.exports=Register;
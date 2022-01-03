const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const transactionschema=new mongoose.Schema({
  transaction_number:{
    type:Number
  },
  stock_name:{
    type:String
  },
  quantity:{
    type:Number
  },
  buying_price:{
    type:Number
  },
  total_price:{
    type:Number
  }
});

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
    },
    transactions:[transactionschema]
})
registerSchema.pre("save",async function(next){
    this.password=bcrypt.hash(this.password,10);
    next();
})


const Register=new mongoose.model("registered",registerSchema);
module.exports=Register;

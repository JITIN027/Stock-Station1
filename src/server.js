const express=require('express');
const app=express();
const path=require('path');
require = require("esm")(module);
const bodyParser=require("body-parser");
const { json }=require("express");
require('./db/conn');
const _=require("lodash");
const ejs=require("ejs");
const stock=require(__dirname+"/stock.js");
const Register=require('./models/register');

const port=process.env.PORT || 3000;

const static_path=path.join(__dirname,"../public")
const template_path=path.join(__dirname,"../templates/views")

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(static_path))

app.set("views",template_path)

app.set('view engine', 'ejs');
var symbol='';
var open=0;
var high=0;
var low=0;
var current=0;
var transactions=[];
var quantity=0;
var regiSchema='';
var email='';
var user='';
var stock_transaction='';
app.get("/aboutus",function(req,res){
    res.render("aboutus");
  });
app.get('/index',(req,res)=>{
    res.render("index")
});
app.get('/',(req,res)=>{
    res.render('register');
});

app.get("/login",(req,res)=>{
    res.render('login');
});
app.post("/index",function(req,res){
    symbol=req.body.share;
    let k=stock.getPrice(symbol);
    k.then(data => { open=data.priceInfo.open;
      low=data.priceInfo.intraDayHighLow.min;
      high=data.priceInfo.intraDayHighLow.max;
      current=data.priceInfo.lastPrice;
      res.render("price",{
        symbol:symbol,
        open:open,
        high:high,
        low:low,
        current:current
      });});
  });
app.get("/buy",function(req,res){
    res.render("buy",{
      symbol:symbol,
      open:open,
      high:high,
      low:low,
      current:current
    });
  });
app.post("/buy",function(req,res){
    quantity=req.body.quantity;
    const calc=current*quantity;
    const price_paid=current*quantity;
    stock_transaction={
      transaction_number:30,
      stock_name:symbol,
      quantity:quantity,
      buying_price:current,
     total_price:calc
   };
    //Register.updateOne({email:user.email},{transactions:stock_tr})
    transaction={
      symbol:symbol,
      quantity:quantity,
      current:current,
      price_paid:price_paid
    };
    transactions.push(transaction);
    console.log(transactions);
    res.redirect("index");
  });
app.get("/insights",function(req,res){
    res.render("insights");
  });
app.get("/transactions",async function(req,res){
    res.render("transactions",{transactions:user.transactions});
  });

app.post("/register",async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        if(password==cpassword){
            regiSchema=new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                password:password,
                confirmpassword:cpassword,
                phoneno:req.body.phoneno

            })
            const registered=await regiSchema.save();
            res.render('login');

        }
        else{
            res.send("passwords are not matching");
        }

    }
    catch(err){
        res.status(400).send(err);
        console.log(err)
    }
});

app.post('/login',async(req,res)=>{
    try{
        email=req.body.email;
        const password=req.body.password;

       user=await Register.findOne({email:email});
       if(password==user.password){
           res.status(201).render('aboutus');
       }else{
           res.send("invalid login details");
       }



    }catch(err){
        res.status(400).send("invalid email");
    }
})

app.get("/about",(req,res)=>{
    res.render('about');
})
app.get("/sell",function(req,res){
    res.render("sell");
  });
app.get("/profile",async function(req,res){
  Register.updateOne({email:user.email},{transactions:[stock_transaction]},function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      console.log(docs);
    }
  }
);


  res.render('profile',{name:user.firstname,lname:user.lastname,email:user.email,phoneno:user.phoneno,transactions:user.transactions});
});

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})

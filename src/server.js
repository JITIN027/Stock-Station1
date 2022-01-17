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
const { Register , Trans , Holdings}=require('./models/register');

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
app.post("/buy",async function(req,res){
    quantity=req.body.quantity;
    const calc=current*quantity;
    if(calc>user.altcoins){
      res.send(("insufficient balance"));
    }
    else{
    transSchema=new Trans({
      user_email:user.email,
      stock_name:symbol,
      transaction_price:current,
      quantity:quantity,
      type_of_transaction:"buy",
      total_price:calc
    })
    const trans=await transSchema.save();
    const new_balance=user.altcoins-calc;
    user.altcoins=new_balance;
    Register.updateOne({email:user.email},{altcoins:new_balance},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
    let temp_update_holding ='';
    let existing_quantity=0;
    let new_quantity=0;
    if(symbol==="CIPLA"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.CIPLA;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{CIPLA:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    } else if(symbol==="IRCTC"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.IRCTC;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{IRCTC:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    } else if(symbol==="ITC"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.ITC;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{ITC:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    } else if(symbol==="TCS"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.TCS;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{TCS:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    } else if(symbol==="TITAN"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.TITAN;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{TITAN:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    } else if(symbol==="HDFC"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.HDFC;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{HDFC:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    } else if(symbol==="WIPRO"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.WIPRO;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{WIPRO:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    } else if(symbol==="MARUTI"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.MARUTI;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{MARUTI:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    } else if(symbol==="ASIANPAINT"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.ASIANPAINT;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{ASIANPAINT:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    } else if(symbol==="BRITANNIA"){
       temp_update_holding = await Holdings.findOne({hold_email:user.email});
       existing_quantity=temp_update_holding.BRITANNIA;
       new_quantity=parseInt(existing_quantity)+parseInt(quantity);
      Holdings.updateOne({hold_email:user.email},{BRITANNIA:new_quantity},function(err,docs){
        if(err){
          console.log(err);
        }
        else{
          console.log(docs);
        }
      });
    }
    res.redirect("index");}
  });

app.get("/transactions",async function(req,res){
    console.log(user.email);
    const all=await Trans.find({user_email:user.email});
    console.log(all);
      res.render("transactions",{transactions:all});
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
                phoneno:req.body.phoneno,
                altcoins:100000

            })
            const registered=await regiSchema.save();
            holdSchema=new Holdings({
              hold_email:req.body.email,
              CIPLA:0,
              IRCTC:0,
              ITC:0,
              TCS:0,
              TITAN:0,
              HDFC:0,
              WIPRO:0,
              MARUTI:0,
              ASIANPAINT:0,
              BRITANNIA:0

            })
            const holdings=await holdSchema.save();
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
app.get("/sell",async function(req,res){
  let sell_available_quantity=0;
  const user_holdings=await Holdings.findOne({hold_email:user.email});
  console.log(user_holdings);
  if(symbol==="CIPLA"){
    sell_available_quantity=user_holdings.CIPLA;
  } else if(symbol==="IRCTC"){
    sell_available_quantity=user_holdings.IRCTC;
  } else if(symbol==="ITC"){
    sell_available_quantity=user_holdings.ITC;
  }
  else if(symbol==="TCS"){
    sell_available_quantity=user_holdings.TCS;
  } else if(symbol==="TITAN"){
    sell_available_quantity=user_holdings.TITAN;
  } else if(symbol==="HDFC"){
    sell_available_quantity=user_holdings.HDFC;
  } else if(symbol==="WIPRO"){
    sell_available_quantity=user_holdings.WIPRO;
  } else if(symbol==="MARUTI"){
    sell_available_quantity=user_holdings.MARUTI;
  } else if(symbol==="ASIANPAINT"){
    sell_available_quantity=user_holdings.ASIANPAINT;
  } else if(symbol==="BRITANNIA"){
    sell_available_quantity=user_holdings.BRITANNIA;
  }
  console.log(sell_available_quantity);
  res.render("sell",{
    symbol:symbol,
    open:open,
    high:high,
    low:low,
    current:current,
    sell_available_quantity:sell_available_quantity
  });;
  });
app.get("/profile",async function(req,res){
  const uhold=await Holdings.findOne({hold_email:user.email});
  console.log(uhold);
  res.render('profile',{name:user.firstname,lname:user.lastname,email:user.email,phoneno:user.phoneno,transactions:user.transactions,altcoins:user.altcoins,uhold:uhold});
});
app.post("/profile",async function(req,res){
  let portfolio=0
  const phold=await Holdings.findOne({hold_email:user.email});
  const k=stock.getPrice('CIPLA');
  k.then(data => {
    const cipla_price=data.priceInfo.lastPrice;
    portfolio=user.altcoins+(phold.CIPLA*cipla_price);
    const l=stock.getPrice("ITC");
    l.then(data => {
      const itc_price=data.priceInfo.lastPrice;
      portfolio=portfolio+(phold.ITC*itc_price);
      const m=stock.getPrice("IRCTC");
      m.then(data => {
        const irctc_price=data.priceInfo.lastPrice;
        portfolio=portfolio+(phold.IRCTC*irctc_price);
        const n=stock.getPrice("TITAN");
        n.then(data => {
          const titan_price=data.priceInfo.lastPrice;
          portfolio=portfolio+(phold.TITAN*titan_price);
          const o=stock.getPrice("HDFC");
          o.then(data => {
            const hdfc_price=data.priceInfo.lastPrice;
            portfolio=portfolio+(phold.HDFC*hdfc_price);
            const p=stock.getPrice("TCS");
            p.then(data => {
              const tcs_price=data.priceInfo.lastPrice;
              portfolio=portfolio+(phold.TCS*tcs_price);
              q=stock.getPrice("WIPRO");
              q.then(data => {
                const wipro_price=data.priceInfo.lastPrice;
                portfolio=portfolio+(phold.WIPRO*wipro_price);
                r=stock.getPrice("MARUTI");
                r.then(data => {
                  const maruti_price=data.priceInfo.lastPrice;
                  portfolio=portfolio+(phold.MARUTI*maruti_price);
                  s=stock.getPrice("ASIANPAINT");
                  s.then(data => {
                    const asianpaint_price=data.priceInfo.lastPrice;
                    portfolio=portfolio+(phold.ASIANPAINT*asianpaint_price);
                    t=stock.getPrice("BRITANNIA");
                    t.then(data => {
                      const britannia_price=data.priceInfo.lastPrice;
                      portfolio=portfolio+(phold.BRITANNIA*britannia_price);
                      console.log(portfolio);
                      res.render("portfolio",{portfolio:portfolio});
                    });
                  });
                });
              });
            });
          });

        });

      });

    });

  });
});
app.post("/sell", async function(req,res){
  const sold_quantity=req.body.sell_quantity;
  const calc=sold_quantity*current;
  transSchema=new Trans({
    user_email:user.email,
    stock_name:symbol,
    transaction_price:current,
    quantity:sold_quantity,
    type_of_transaction:"sell",
    total_price:calc
  })
  const trans=await transSchema.save();
  const new_balance=user.altcoins+calc;
  user.altcoins=new_balance;
  Register.updateOne({email:user.email},{altcoins:new_balance},function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      console.log(docs);
    }
  });
  let temp_update_holding ='';
  let existing_quantity=0;
  let new_quantity=0;
  if(symbol==="CIPLA"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.CIPLA;
     new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{CIPLA:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  } else if(symbol==="IRCTC"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.IRCTC;
     new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{IRCTC:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  } else if(symbol==="ITC"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.ITC;
    new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{ITC:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  } else if(symbol==="TCS"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.TCS;
     new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{TCS:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  } else if(symbol==="TITAN"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.TITAN;
     new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{TITAN:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  } else if(symbol==="HDFC"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.HDFC;
     new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{HDFC:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  } else if(symbol==="WIPRO"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.WIPRO;
     new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{WIPRO:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  } else if(symbol==="MARUTI"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.MARUTI;
     new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{MARUTI:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  } else if(symbol==="ASIANPAINT"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.ASIANPAINT;
     new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{ASIANPAINT:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  } else if(symbol==="BRITANNIA"){
     temp_update_holding = await Holdings.findOne({hold_email:user.email});
     existing_quantity=temp_update_holding.BRITANNIA;
     new_quantity=parseInt(existing_quantity)-parseInt(sold_quantity);
    Holdings.updateOne({hold_email:user.email},{BRITANNIA:new_quantity},function(err,docs){
      if(err){
        console.log(err);
      }
      else{
        console.log(docs);
      }
    });
  }
res.redirect("index");
});

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})

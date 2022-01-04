const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://jitin:jitin027@cluster0.slipv.mongodb.net/registered?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log(` register conn is successful`);
}).catch((err)=>{
    console.log(err);
})

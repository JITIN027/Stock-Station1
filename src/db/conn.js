const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://admin:karthikhegd6960@cluster0.slipv.mongodb.net/registered?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=>{
    console.log(`conn is successful`);
}).catch((err)=>{
    console.log(err);
})
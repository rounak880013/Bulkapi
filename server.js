const mongoose=require('mongoose');
const express=require('express');
const app=express();

let port='8080';
const getnext=require("./practice");
app.listen(port,function(){
    console.log(`server is listening on port ${port}`);
});
const db_link='mongodb+srv://Rounak:Rounak@cluster0.obxdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(db_link).then(function(){
    console.log('db_connect');
})
.catch(function(err){
    console.log(err);
});
app.use(express.json());
app.get('/',(req,res)=>{
    res.sendFile('Search _ Sales Navigator wingiffy pge 2.html', { root: '.' })
});

const pagedata=new mongoose.Schema({
    li_at:{
        type:String,
        required:true
    },
    URL:{
        type:String,
        required:true
    }
});
const before_scrap=mongoose.model('before_scrap',pagedata);

let li="AQEDATMzHgcAblGxAAABfhlK9K4AAAF-PVd4rk0AJEHLIUr7iMiRY0ut91IUDV-jGhXLOW2MzouXetcx5NORD8teyaqEE7M2MSO2i2a6mJTA8nWqQD_opuD90CMEmqWuxZwDFWnsVxXqZjHvHbJ2wMn0";
let linkedURL="https://www.linkedin.com"

function add_first_data(){
    console.log("function");
    (async function adding_data(){
        console.log("edrgft");
        let user={
            li_at:`${li}`,
            URL:`${linkedURL}`
        };
        let userObj=await before_scrap.create(user);
        await getnext();
        console.log(userObj);
    })();
}
add_first_data()
const user_master=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    api_token:{
        type:String,
        required:true
    }
});
const user_master_data=mongoose.model('user_master_data',user_master);
const Credit_master=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    credit_left:{
        type:String,
        required:true
    }
});
const Credit_master_data=mongoose.model('Credit_master_data',Credit_master);
const plan_master=new mongoose.Schema({
    plan_id:{
        type:Number,
        required:true
    },
    plan_name:{
        type:String,
        required:true
    },
    is_yearly:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    credits:{
        type:Number,
        required:true
    },
    plan_is_active:{
        type:Number,
        required:true
    },
    roll_over_plan:{
        type:Number,
        required:true
    }
});
const plan_master_data=mongoose.model('plan_master_data',plan_master);

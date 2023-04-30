const express = require("express");
const {MongoClient,ServerApiVersion} = require('mongodb')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 2000;

// using middelwares
app.use(cors())
app.use(express.json())


// configureation for mongodb
const uri ="mongodb+srv://maruf:HlySRHaaykFIugON@cluster0.c1kdkc3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri,{
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

// Connecting to the database
async function connectToDatabase (){
    try{
      //Database name and collections names 
      const db = client.db('job-box');
      const candidate = db.collection('candidate');
      const employer = db.collection('employer')

// 1. posting employees data on registration
        app.post('/register/candidate',async(req,res)=>{
            const candidateData = req.body.data;
            const result = await candidate.insertOne(candidateData);
            res.send(result)
            
        })

// 2. Posting employer data on database
        app.post('/register/employer',async(req,res)=>{
            const data = req.body.data;
            const result = await employer.insertOne(data);
            return result;

        })
        // 3. sending candidate data to the backend
        app.get('/candidates',(req,res)=>{
            res.send("getting it worked")
            
        })
        
    }

   finally{

   }
}

connectToDatabase().catch((error)=>{
    console.log(error);

})


// Api for testing the server
app.get('/test',(req,res)=>{
    console.log("got a request");
    res.send('server is working properly')
})


app.listen(PORT,()=>{
    console.log(`Your server is runninng on port${PORT}`);
})
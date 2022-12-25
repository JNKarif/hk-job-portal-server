const express = require('express');
const cors= require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express();

// middlewares
app.use(cors());
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ei4prfy.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

try{
const jobSectorsCollection = client.db('hk-job-portal').collection('sectors')

app.get('/jobSectors', async(req, res)=>{
    const query ={};
    const sectors = await jobSectorsCollection.find(query).toArray();
    res.send(sectors);
})

}
finally{

}

}

run().catch(console.log)


app.get('/', async(req, res)=>{
    res.send('HK Job Portal Server is running')
})

app.listen(port, ()=> console.log(`HK Job Portal is running on ${port}`))
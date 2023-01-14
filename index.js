const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express();

// middlewares
app.use(cors());
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ei4prfy.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const jobSectorsCollection = client.db('hk-job-portal').collection('sectors');
        const jobCandidatesDataCollection = client.db('hk-job-portal').collection('candidatesData');
        const jobsCollection= client.db('hk-job-portal').collection('jobs')

        app.get('/jobSectors', async (req, res) => {
            const query = {};
            const sectors = await jobSectorsCollection.find(query).toArray();
            res.send(sectors);
        })

        app.post('/candidatesData', async (req, res) => {
            const candidatesData = req.body;
            console.log(candidatesData);
            const result = await jobCandidatesDataCollection.insertOne(candidatesData);
            res.send(result)
        })

        app.get('/candidatesData', async (req, res) => {
            const email = req.query.email;
            console.log(email)
            const query = { email: email };
            const data = await jobCandidatesDataCollection.find(query).toArray();
            res.send(data)
        })

        app.get('/jobs', async(req, res)=>{
            const query = {};
            const jobs= await jobsCollection.find(query).toArray();
            res.send(jobs)
        })

    }
    finally {

    }

}

run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('HK Job Portal Server is running')
})

app.listen(port, () => console.log(`HK Job Portal is running on ${port}`))
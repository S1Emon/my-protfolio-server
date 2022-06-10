const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const cors = require('cors');

//middleware
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8wbdz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    await client.connect()
    console.log("Db is connected");
    const projectCollection = client.db("myPortfolio").collection("projects");

    try {
        // get Data
        app.get("/projects", async (req, res) => {
            const query = {}
            const result = await projectCollection.find(query).toArray()
            res.send(result);
        })
        app.get("/project/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const project = await projectCollection.findOne(query);
            res.send(project)
        })


    }
    finally {
        // await client.close()
    }




}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send("Server Home page");
})

app.listen(port, () => {
    console.log("Server is running");
})
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 3500


// middleware
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eo2hmpk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const cardCollection = client.db("collegeDB").collection("collegeCardData");





        app.get("/collegedata", async (req, res) => {
            const cursor = cardCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })


        app.get("/collegedata/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cardCollection.findOne(query)
            res.send(result);
        })

        app.post("/collegedata", async (req, res) => {
            const toys = req.body;
            const result = await cardCollection.insertOne(toys)
            res.send(result)
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('College Booking Server is running!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
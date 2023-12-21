const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config()


const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = "mongodb+srv://tm-database:7vXx1bopJsRLyBs8@cluster0.j998cjx.mongodb.net/?retryWrites=true&w=majority";

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
    // await client.connect();

    const userCollection = client.db("tm-database").collection("users");


    // jwt related api


 
 
  
    
    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;

      // Check if the user with the given email already exists
      const existingUser = await userCollection.findOne({ email: user.email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });




    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('tm is running')
})

app.listen(port, () => {
  console.log(`TM server is running on port: ${port}`);
})


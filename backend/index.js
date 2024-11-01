const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@yoga-master.b1dil.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();  // Connect to the MongoDB server

    // Create a database and collections
    const database = client.db("yoga-master");  
    const userCollection = database.collection("users");
    const classesCollection = database.collection("classes");
    const cartCollection = database.collection("cart");
    const paymentCollection = database.collection("payments");
    const enrolledCollection = database.collection("enrolled");
    const appliedCollection = database.collection("applied"); 

    // Classes routes
    app.post('/new-class', async(req, res) => {
      const newClass = req.body;
      const result = await classesCollection.insertOne(newClass);
      res.send(result);
    });

   app.get('/classes', async(req, res)=>{
     const query = { status : 'approved' };
     const result = await classesCollection.find().toArray();
     res.send(result); 
   })

  //  get classes by instructor email address
    app.get('/classes/:email', async(req, res)=>{
      const email = req.params.email;
     const query = {instructorEmail : email};
     const result = await classesCollection.find(query).toArray(); 
     res.send(result); 
    })

    // manage classes 
    app.get('/classes-manage', async(req, res)=>{
      const result = await classesCollection.find().toArray();
     res.send(result);
    })

    // update classes status and reason
    app.patch('/change-status/:id', async(req, res)=>{
      const id = req.params.id;
      const status = req.body.status;
      const reason = req.body.reason;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true } ;
      const updateDoc = {
        $set: {
        status : status,
        reason : reason,
        },
      };
      const result = await classesCollection.updateOne(filter , updateDoc , options);
      res.send(result);
    })

    // get approved classes
    app.get('/approved-classes', async(req, res)=>{
      const query = { status : 'approved' };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    })

    // Test route
    app.get('/', (req, res) => {
      res.send('Hello Developers! 2025');
    });


    // get single class details
    app.get('/class/:id', async (req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result =  await classesCollection.findOne(query);
      res.send(result);
    })

    // update class details (all data)
    app.put('/update-class/:id',async (req,res)=>{
      const id = req.params.id;
      const updateClass = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert:true};
      const updateDoc = {
        $set: {
          name : updateClass.name,
          description : updateClass.description,
          price : updateClass.price,
          availableSeats : parseInt(updateClass.availableSeats),
          videoLink : updateClass.videoLink,
          status : 'pending',

        }
      };
      const result = await classesCollection.updateOne(filter, updateDoc, options);
      res.send(result);

    })



    // Confirm successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (error) {
    console.error("Connection error:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

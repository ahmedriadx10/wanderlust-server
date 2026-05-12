const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

const cors = require("cors");
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {

    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

const database=client.db('wanderlust-travel')
const destinationsCollection=database.collection('destinations')






// destination data post api

app.post('/destinations',async (req,res)=>{

const destination= req.body
console.log(destination)

const result=await destinationsCollection.insertOne(req.body)

res.send(result)



})


// destinations data get api 

app.get('/destinations',async(req,res)=>{

  const destinations =await destinationsCollection.find().toArray()

res.send(destinations)

})

// destination data get by id api

app.get('/destinations/:id',async(req,res)=>{

  const {id}=req.params

  const query={_id:new ObjectId(id)}
  const exactDestination=await destinationsCollection.findOne(query)
console.log(exactDestination)
  res.send(exactDestination)



})



// destination update one 

app.patch('/destinations/:id',async(req,res)=>{

  const {id}=req.params
  const updatedData=req.body
const query={
  _id:new ObjectId(id)
}

const result=await destinationsCollection.updateOne(query,{
  $set:{...updatedData}
})



console.log(result)

res.send(result)

})




  } finally {
    // await client.close()
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From Express Server");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

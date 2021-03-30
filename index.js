const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config()


const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

console.log(process.env.DB_USER);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ivwbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
 console.log('error test', err);
  const assignmentCollection = client.db("assignment").collection("grocery");
  console.log('Connection successfully')
 

  



});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 7070, () => {
  console.log("http://localhost:7070")
})


// app.post('/addEvent', (req, res) => {
//   const newEvent = req.body;
//   console.log('adding new body', newEvent);
//   assignmentCollection.insertOne(newEvent)
//   .then(result => {
//     console.log('inserted Count', result.insertedCount)
//     res.send(result.insertedCount > 0)
//   })
// })
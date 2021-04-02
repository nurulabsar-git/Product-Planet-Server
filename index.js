const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config()


const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// console.log(process.env.DB_USER);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ivwbd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
//  console.log('error test', err);
  const assignmentCollection = client.db("assignment").collection("grocery");
  // console.log('Connection successfully')
 

  app.post('/addGrocery', (req, res) => {
 
    const newData = req.body;
    console.log("new data: ", newData);
    assignmentCollection.insertOne(newData)
    .then(result => {
      // console.log('inserted count', result.insertedCount)
      res.send(result.insertedCount > 0)
    })

  })


  app.get('/products', (req, res) => {
    assignmentCollection.find()
    .toArray((err, products) => {
      // console.log("from database", products)
      res.send(products)
    })
  })


  app.delete('/deleteProduct/:id', (req, res) =>{

    const id = ObjectID(req.params.id);
    console.log('delete text', id);
    assignmentCollection.deleteOne({_id: id})
    .then((err, documents) => res.send({
      success: true
    }))
  })
  


});

app.get('/', (req, res) => {
  res.send('This is assignment ten!')
})

app.listen(process.env.PORT || 7070, () => {
  console.log("http://localhost:7070")
})


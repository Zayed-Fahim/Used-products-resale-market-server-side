const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
    `mongodb+srv://${process.env.ADMIN}:${process.env.PASSWORD}@cluster0.llom3t1.mongodb.net/?retryWrites=true&w=majority`;
  console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

















app.get('/', (req, res) => {
    res.send('Resale phone market server is running');
})
app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`)
})
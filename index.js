const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.ADMIN}:${process.env.PASSWORD}@cluster0.llom3t1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const categoriesCollection = client.db("phonesDotCom").collection("categories");
  const androidsCollection = client.db("phonesDotCom").collection("androids");
  const iphonesCollection = client.db("phonesDotCom").collection("iphones");
  const tabletIpadsCollection = client.db("phonesDotCom").collection("tablet-ipads");
  const bookingsCollection = client.db("phonesDotCom").collection("bookings");
  const usersCollection = client.db("phonesDotCom").collection("users");
  try {
    app.get("/categories", async (req, res) => {
      const query = {};
      const cursor = categoriesCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });
    app.get("/categories/:_name", async (req, res) => {
      const _name = req.params._name;
      const query = { _name };
      const category = await categoriesCollection.findOne(query);
      res.send(category);
    });
    app.get("/androids", async (req, res) => {
      const query = {};
      const cursor = androidsCollection.find(query);
      const androids = await cursor.toArray();
      res.send(androids);
    });
    app.get("/iphones", async (req, res) => {
      const query = {};
      const cursor = iphonesCollection.find(query);
      const iphones = await cursor.toArray();
      res.send(iphones);
    });
    app.get("/tablet-ipads", async (req, res) => {
      const query = {};
      const cursor = tabletIpadsCollection.find(query);
      const tabletIpads = await cursor.toArray();
      res.send(tabletIpads);
    });
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });
    app.get('/bookings', async (req, res) => {
      const email = req.query.email;
      console.log(email)
      const query = { buyer_email: email };
      const bookings = await bookingsCollection.find(query).toArray();
      res.send(bookings)
    });
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    })
  } catch {}
}
run().catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("Resale phone market server is running");
});
app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});

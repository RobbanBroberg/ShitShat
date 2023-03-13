import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
import { MongoClient } from 'mongodb';

let dbConnection;

async function connect() {
  try {
    const client =  await MongoClient.connect(process.env.URI);
    dbConnection = client.db('ShitShat');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  };
}
connect();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {

  dbConnection.collection("users")
    .find()
    .toArray()
    .then((users) => {
      res.status(200).json(users);
    });
});

app.post("/users", (req, res) => {

  dbConnection.collection("users")
    .insertOne(req.body)
    .then(() => {
      res.status(200).json({mssg: "User added"})
    })
});

app.listen(process.env.PORT, () => {
  console.log("Server is running..");
});

const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
  });
});


const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const client = new MongoClient(url, {
  useNewUrlParser: true
});
client.connect()
  .then((connectedClient) => {
    console.log('mongodb is connected');
  })
  .catch(error => {
    console.error(error);
  });

router.get('/api/mongo', function (req, res, next) {
  res.json({
    isConnected: client.isConnected(),
  });
});

router.post('/api/echo', function (req, res, next) {
  const body = req.body;

  // Write in MongoDb
  const worker = (async function (data) {
    const db = client.db(dbName);
    const collection = db.collection('echo');
    const result = await collection.insertOne(data);
    console.log(result);
    return result;
  })(body);

  // Response
  worker.then(() => {
      res.json(body);
    })
    .catch(next);
});

module.exports = router;
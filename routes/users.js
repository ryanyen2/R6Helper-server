var express = require('express');
var router = express.Router();
const Mongoose = require('mongoose');
const {
  Schema
} = Mongoose;


const usersSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  strict: 'throw'
});

usersSchema.index({
  username: 1
}, {
  unique: true
});

module.exports = Mongoose.model('users', usersSchema);


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
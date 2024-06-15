const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User.js');
require('dotenv').config();
const app = express();

const PORT = 4000;

const jwtSecret = 'adlsfhjgivblhjgasdfl7863jakhjg';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5174'
}));

mongoose.connect(process.env.MONGO_URL);


app.get('/test', (req, res) => {
  res.json('Test ok!');
});

app.get('/register', (req, res) => {
  res.json('Register ok!');
});


app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  let bcryptSalt = bcrypt.genSaltSync(10);
  let hashPassword = bcrypt.hashSync(password, bcryptSalt);
  try {
    const userDoc = await User.create({
      name,
      email,
      password: hashPassword
    });
    res.status(200).json(userDoc);

  } catch(error) {
    if(error.code === 11000) {
      console.log("Error!! No duplicate emails are allowed!", error);
      res.status(422).send("Error!! Email is already in use, no duplicate emails are allowed!");
    } else {
      res.status(422).json(error);
    }
  }
});

app.get('/login', (req, res) => {
  res.status(200).json('Log in page!!');
})

app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const userDoc = await User.findOne({email});
  if(userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk) {
      jwt.sign({ email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
        if(err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('Password not ok');
    }
  } else {
    res.json("User Not Found");
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
})

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  if(token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if(err) throw err;
      const {name, email, _id} = await User.findById(userData.id);
      res.json({name, email, _id});
    });
  } else {
    res.json(null);
  }
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}! - - - - - - - - - - - - - - - - - - - - - - - - - -`);
});

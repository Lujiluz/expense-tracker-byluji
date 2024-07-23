require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const { db } = require('./db/db');

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// routes
readdirSync('./routes').map((route) => {
  app.use('/api/v1', require(`./routes/${route}`));
});

const server = () => {
  app.listen(PORT, () => {
    db();
    console.log('You are listening to port:', PORT);
  });
};

server();

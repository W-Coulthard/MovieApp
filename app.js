// app.js
const express = require('express');
const app = express();

const detail = require('./detail');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(detail);

app.get('/trailers/:id', (req, res) => {
  // Retrieve the trailer by id and return it
});

app.listen(3000, () => {
  console.log('Movie site server listening on port 3000');
});


/*const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
*/
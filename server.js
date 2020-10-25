const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/.*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

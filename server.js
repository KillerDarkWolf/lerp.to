const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const yup = require('yup');
const monk = require('monk');
const { nanoid } = require('nanoid');

require('dotenv').config();

const db = monk(process.env.MONGO_URI);
const urls = db.get('shortUrls');
urls.createIndex({ slug: 1 }, { unique: true });

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(morgan('tiny'));
app.use(cors());

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:id', async (req, res, next) => {
  const { id: slug } = req.params;
  try {
    const url = await urls.findOne({ slug });
    if (url) {
      res.redirect(url.url);
    }
    res.redirect(`/?error=${slug} not found`);
  } catch (error) {
    res.redirect(`/?error=Link not found`);
  }
});

const schema = yup.object().shape({
  alias: yup
    .string()
    .trim()
    .matches(/[\w\-]/i),
  url: yup.string().trim().url().required(),
});

app.post('/url', async (req, res, next) => {
  console.log(req.body);
  let { slug, url } = req.body;
  try {
    if (!slug) {
      slug = nanoid(4);
    } else {
      const exisiting = await urls.findOne({ slug });
      if (exisiting) {
        throw new Error('Slug in use. 🐌');
      }
    }
    await schema.validate({
      slug,
      url,
    });
    slug = slug.toLowerCase();
    let newUrl = {
      url,
      slug,
    };
    const created = await urls.insert(newUrl);
    res.json(created);
  } catch (error) {
    next(error);
  }
});

app.get('/url/:id', (req, res, next) => {
  // get url info by id
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

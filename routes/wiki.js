const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  console.log('main wiki page');
  res.send('change');
});

router.get('/add', (req, res, next) => {
  console.log('wiki add page');
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  const page = await Page.findOne({
    where: {
      slug: req.params.slug,
    },
  });
  console.log('PAGE', page);
  res.json(page);
});

router.post('/', async (req, res, next) => {
  console.log('wiki post');

  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.author_content,
    });
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;

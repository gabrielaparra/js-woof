const express = require('express');
const router  = express.Router();

router.get('/services', (req, res, next) => {
  res.render('services-view.ejs');
});

router.get('/gallery', (req, res, next) => {
  res.render('gallery-view.ejs');
});

module.exports = router;

const express = require('express');
const router  = express.Router();

router.get('/gallery', (req, res, next) => {
  res.render('gallery-view.ejs');
});

module.exports = router;

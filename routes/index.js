const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.locals.currentUser = req.user;
  res.render('index');
});

module.exports = router;

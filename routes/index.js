var express = require('express');
var router = express.Router();

/**
 * Home route redirects to /books route
 */
router.get('/', (req, res, next) => {
  res.redirect('/books');
});


module.exports = router;

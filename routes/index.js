const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('./pages/mainPage', { title: 'Express' });
});

module.exports = router;

const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('./pages/mainPage', { title: '배민상회::메인' });
});

router.get('/signin', (req, res) => {
  res.render('./pages/signin', { title: '배민상회::로그인' });
});

module.exports = router;

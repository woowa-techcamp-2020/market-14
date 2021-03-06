const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('./pages/main', { title: '배민상회', user: req.session.user });
});

router.get('/signin', (req, res) => {
  res.render('./pages/signin', { title: '로그인 - 배민상회' });
});

router.get('/signup', (req, res) => {
  res.render('./pages/signup', { title: '회원가입 - 배민상회' });
});

module.exports = router;

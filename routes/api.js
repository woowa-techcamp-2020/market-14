const express = require('express');
const moment = require('moment');
const { body, matchedData, validationResult } = require('express-validator');
const userManager = require('../modules/UserManager');
const Validator = require('../modules/Validator');

const router = express.Router();

router.post('/login', (req, res) => {
  res.send(req);
});

router.post(
  '/signup',
  [
    body('userId').isLength({ min: 4, max: 20 }).matches(Validator.RegexUserId).trim(),
    body('userPw').isLength({ min: 8, max: 20 }).matches(Validator.RegexUserPassword).trim(),
    body('email').isEmail().trim(),
    body('userName').trim(),
    body('phoneNo').matches(Validator.RegexPhoneNumber).trim(),
    body('authNo').isLength(6).isNumeric().trim(),
    body('zipCode').optional({ checkFalsy: true }).matches(Validator.RegexZipCode).trim(),
    body('address').optional({ checkFalsy: true }).matches(Validator.RegexAddress).trim(),
    body('addressDetail').optional({ checkFalsy: true }).matches(Validator.RegexAddress).trim(),
    body('agreeMarketing')
      .optional()
      .custom((val) => val === 'Y' || val === 'N'),
    body('agreeService')
      .optional()
      .custom((val) => val === 'Y' || val === 'N'),
  ],
  async (req, res) => {
    const result = {};
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      result.code = '1';
      result.message = '전송 값을 확인해주세요.';
      res.status(400).json(result);
      return;
    }

    const matchedBody = matchedData(req, { includeOptionals: true });
    const currentDatetime = moment().format('YYYY-MM-DD HH:mm:ss');
    const agreeMarketing = matchedBody.agreeMarketing === 'Y' ? '1' : '0';

    const checkUser = await userManager.findUserById(matchedBody.userId);
    if (checkUser.id === matchedBody.userId) {
      result.code = '2';
      result.message = '이미 존재하는 아이디입니다.';
      res.status(409).json(result);
      return;
    }

    if (matchedBody.authNo !== '123456') {
      result.code = '3';
      result.message = '인증번호가 틀립니다.';
      res.status(400).json(result);
      return;
    }

    const user = {
      id: matchedBody.userId,
      password: matchedBody.userPw,
      email: matchedBody.email,
      name: matchedBody.userName,
      phoneNumber: matchedBody.phoneNo,
      zipCode: matchedBody.zipCode,
      address: matchedBody.address,
      addressDetail: matchedBody.addressDetail,
      signupDatetime: currentDatetime,
      agreeMarketing,
      agreeMarketingDatetime: currentDatetime,
    };

    userManager.createUser(user).then(() => {
      result.code = '0';
      result.message = '회원가입 완료.';
      res.status(201).json(result);
    });
  },
);

module.exports = router;

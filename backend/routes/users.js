var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { hashPassword } = require('../utils/index');

// 유저 회원가입
// 유저 등록시에 pictures 하위에 폴더를 생성해야함.
router.post('/', async function(req, res, next) {
  let userInfo = req.body;
  const hash = await hashPassword(userInfo.userPassword);
  userInfo.userPassword = hash;
  User.create(userInfo).then((user) => {
    res.status(200).json(user);
  }).catch((err) => {
    res.status(500).json({"error" : err});
  });
});

// 유저 정보 아이디 기준 업데이트
router.put('/', function(req, res, next) {
  const userId = checkToken(req, res)["result"]["_id"]
  User.findByIdAndUpdate(userId, req.body).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json({"error" : err});
  });
});

// 유저 아이디 기준 삭제
router.delete('/', function(req, res, next) {
  const userId = checkToken(req, res)["result"]["_id"]
  User.findByIdAndDelete(userId).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json({"error" : err});
  }); 
});

// 이메일 기준 검색
router.get('/email/:userEmail', function(req, res, next) {
  User.findOne({"userEmail" : req.params.userEmail}).then((user) => {
    res.status(200).json(user);
  }).catch((err) => {
    res.status(500).json({"error" : err});
  }); 
});


// 닉네임 기준 검색
router.get('/usernickname/:userNickname', function(req, res, next) {
  User.findOne({"userNickname" : req.params.userNickname}).then((user) => {
    res.status(200).json(user);
  }).catch((err) => {
    res.status(500).json({"error" : err});
  }); 
});

// 임의 옵션 기준 검색
router.get('/option', function(req, res, next) {
  User.find(req.query).then((users) => {
    res.status(200).json(users);
  }).catch((err) => {
    res.status(500).json({"error" : err});
  }); 
});

// 유저 전체 가져오기
router.get('/', function(req, res, next) {
  User.find().limit(30).then((users) => {
    res.status(200).json(users);
  }).catch((err) => {
    res.status(500).json({"error" : err});
  }); 
});

module.exports = router;
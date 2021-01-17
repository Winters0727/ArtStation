var express = require('express');
var router = express.Router();
const User = require('../models/user');

const { checkToken } = require('../utils/jwt');
// const { hashPassword } = require('../utils/index');

// 유저 회원가입
router.post('/', async function(req, res, next) {
  const userInfo = req.body;
  // userInfo['userPassword'] = await hashPassword(req.body['userPassword']);
  await User.register(userInfo, userInfo['userPassword'])
  .then(() => {
    res.status(200).json({"result" : "success"});
  }).catch((err) => {
    res.status(500).json({"error" : err});
  });
});

// 유저 정보 아이디 기준 업데이트
router.put('/', function(req, res, next) {
  const userId = checkToken(req, res)["result"]["_id"]
  User.findByIdAndUpdate(userId, req.body).then(() => {
    res.status(200).json({"result" : "success"});
  }).catch((err) => {
    res.status(500).json({"error" : err});
  });
});


// 사진 좋아요 누르기
router.put('/like', async function(req, res, next) {
  const userId = checkToken(req, res)["result"]["_id"]
  const userInfo = await User.findById(userId);
  userInfo['userLikePic'].push(req.body.picture);
  User.findByIdAndUpdate(userId, userInfo).then(() => {
    res.status(200).json({"result" : "success"});
  }).catch((err) => {
    res.status(500).json({"error" : err});
  });
});

// 유저 아이디 기준 삭제
router.delete('/', function(req, res, next) {
  const userId = checkToken(req, res)["result"]["_id"]
  User.findByIdAndDelete(userId).then(() => {
    res.status(200).json({"result" : "success"});
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
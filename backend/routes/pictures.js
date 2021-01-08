var express = require('express');
var router = express.Router();
const Picture = require('../models/picture');

// 그림 생성
router.post('/', function(req, res, next) {
    Picture.create(req.body).then((pic) => {
        res.status(200).json(pic);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    });
  });

// 그림 업데이트
router.put('/', function(req, res, next) {
    Picture.findByIdAndUpdate(req.body._id).then((result) => {
        res.status(200).json(result);
      }).catch((err) => {
        res.status(500).json({"error" : err});
      }); 
    });

// 그림 삭제
router.delete('/', function(req, res, next) {
    Picture.findByIdAndDelete(req.body._id).then((result) => {
        res.status(200).json(result);
      }).catch((err) => {
        res.status(500).json({"error" : err});
      }); 
    });


// 임의 옵션 기준 검색
router.get('/option', function(req, res, next) {
    Picture.find(req.query).then((characters) => {
        res.status(200).json(characters);
      }).catch((err) => {
        res.status(500).json({"error" : err});
      }); 
  });

// 모든 그림 가져오기
router.get('/', function(req, res, next) {
    Character.find().then((characters) => {
        res.status(200).json(characters);
    }).catch((err) => {
        res.status(500).json({"error" : err});
      });
    });

module.exports = router;

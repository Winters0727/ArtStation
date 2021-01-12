var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();
const Picture = require('../models/picture');

// 그림 생성
// router.post('/', function(req, res, next) {
//   res.send('성공');
  // const data = req.body;
  // const picturePath = path.join(__dirname, '..', 'pictures');
  // fs.readdir(picturePath, (err, files) => {
  //   if (err) res.status(500).json({'error' : err});
  //   console.log(path.join(picturePath, data.picArtist));
  //   if (!files.includes(data.picArtist)) {
  //     fs.mkdir(path.join(picturePath, data.picArtist), (err) => {
  //       if (err) res.status(500).json({'error' : err});
  //     });
  //   }
  // });

  // fs.writeFileSync(path.join(picturePath, data.picArtist, `${data.picTitle}.png`), data.blobImage, () => {
  //   console.log('Image saved!');
  // });

  // if (err) {
  //   res.status(500).json({'error' : err});
  // } else {
  //   res.status(200).json(req.body);
  // }
  // delete data.baseImage;
    // Picture.create(req.body).then((pic) => {
    //     res.status(200).json(pic);
    // }).catch((err) => {
    //   res.status(500).json({"error" : err});
    // });
  // });

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
  if (Object.keys(req.query).includes('limit')) {
    const options = req.query;
    const limit = parseInt(req.query['limit']);
    delete options.limit;
    Picture.find(options).limit(limit).then((characters) => {
      res.status(200).json(characters);
  }).catch((err) => {
      res.status(500).json({"error" : err});
    });
  } else {
    Picture.find(req.query).then((characters) => {
      res.status(200).json(characters);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    }); 
  }
}); 

// 모든 그림 가져오기
router.get('/', function(req, res, next) {
  Picture.find().then((characters) => {
    res.status(200).json(characters);
  }).catch((err) => {
    res.status(500).json({"error" : err});
  });  
});

module.exports = router;

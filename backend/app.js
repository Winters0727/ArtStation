var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');

const Picture = require('./models/picture');

var usersRouter = require('./routes/users');
var picturesRouter = require('./routes/pictures');

var app = express();

mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/storage', express.static(path.join(__dirname, 'pictures')));

// CORS policy
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

const picturePath = path.join(__dirname, 'pictures');

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(picturePath, req.body['picArtist']));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});

app.post('/api/pictures', upload.single('picImage'), function(req, res) {
  const data = req.body;
  fs.readdir(picturePath, (err, files) => {
    if (err) res.status(500).json({'error' : err});

    if (!files.includes(data['picArtist'])) {
      fs.mkdir(path.join(picturePath, data['picArtist']), (err) => {
        if (err) res.status(500).json({'error' : err});
      });
    }
  });

  fs.readdir(path.join(picturePath, data['picArtist']), (err, files) => {
    const pictureInfo = {...req.body, 
      filePath : path.join(req.body['picArtist'], files[files.length-1])
    };

    Picture.create(pictureInfo).then((picture) => {
      res.status(200).json(picture);
    }).catch((err) => {
      res.status(500).json({"error" : err});
    });
  });
})

app.use('/api/users', usersRouter);
app.use('/api/pictures', picturesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

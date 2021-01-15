var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

require('./passport');

const Picture = require('./models/picture');

const usersRouter = require('./routes/users');
const picturesRouter = require('./routes/pictures');

const app = express();

mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;

const MongoStore = require('connect-mongo')(session);

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
  origin: true,
  credentials : true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// 인증관련
app.use(session({
  secret : process.env.SECRET,
  resave : true,
  saveUninitialized : true,
  cookie: { maxAge: 24*60*60*1000 },
  store : new MongoStore({ mongooseConnection : mongoose.connection }),
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 로그인
const createToken = require('./utils/jwt').createToken;
const User = require('./models/user');

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) res.status(500).json({'error' : err});
    if (user) {
      const payload = {
        _id : user._id,
        userEmail : user.userEmail,
        userNickname : user.userNickname,
        userProfilePic : user.userProfilePic
      };
      req.session._id = user._id;
      req.session.userEmail = user.userEmail;
      req.session.userNickname = user.userNickname;
      const { token, refreshToken } = createToken(payload);
      res.status(200).json({ result : 'success', token : token, refreshToken : refreshToken });
    } else {
      User.findOne({userEmail : req.body['userEmail']})
      .then((user) => {
        if (user === null) {
          res.json({ 'error' : 4001 });
        } else {
          if (user['userPassword'] !== req.body['userPassword']) res.json({ 'error' : 4002 });
        }
      })
      .catch((err) => res.status(500).json({'error' : err}));
    };
  })(req, res);
});

// 로그아웃
app.get('/logout', function(req, res, err) {
  req.logout();
  res.status(200).json({ 'result' : 'success' });
})

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


// 업로드 관련 코드
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
});

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

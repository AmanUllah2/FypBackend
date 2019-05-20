const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var opn = require('opn')
var dialog = require('dialog');
const multer = require('multer');
const csv = require('fast-csv');
const upload = multer({ dest: 'tmp/csv/' });

module.exports = {

  create: function (req, res, next) {
    userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, function (err, result) {
      if (err)
        next(err);
      else
        dialog.info('User Added Successfully.!');
      //res.json({status: "success", message: "User added successfully!!!", data: null});

    });
  },
  authenticate: function (req, res, next) {
    userModel.findOne({
      email: req.body.email
    }, function (err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          opn('http://localhost:8080/#/home');
          //const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
          //res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
        } else {
          dialog.info('Invalid email or password.!');
        }
      }
    });

  },
  view: function (req, res, next) {
    userModel.find({
      name: req.body.name
    }, function (err, result) {
      if (err)
        next(err);
      else
        res.json({
          status: "success",
          message: "Users found successfully!!!",
          data: null
        });
    });
  },
  CSVsearch: function (req, res) {
    const fileRows = [];
  
    // open uploaded file
    csv.fromPath(req.file.path)
      .on("data", function (data) {
        fileRows.push(data); // push each row
      })
      .on("end", function () {
        console.log(fileRows)
        fs.unlinkSync(req.file.path);   // remove temp file
        //process "fileRows" and respond
      })
  }
  
}
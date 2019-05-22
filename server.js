const express = require('express');
const logger = require('morgan');
const users = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
var dialog = require('dialog');
const multer = require('multer');
const csv = require('fast-csv');
const upload = multer({ dest: 'tmp/csv/' });
const app = express();
var cors = require('cors');



app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function(req, res){
res.json({"Node" : "REST API with node.js"});
});


// public route
app.use('/users', users);
app.get('/extract', (req, res) => {

  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./extractUrl.py']);

  pyProg.stdout.on('data', function(data) {
    console.log(data.toString());
    res.write(data);
    res.end('end');
    dialog.info('URL extracted Successfully.!');
  });
})

app.get('/visualize', (req, res) => {

  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./vis.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
})

app.get('/testcase', (req, res) => {

  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./testcase.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
})

app.get('/dataforml', (req, res) => {

  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./etpu.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
})

app.get('/testvis', (req, res) => {

  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./visualizeTestdata.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
})

app.get('/cattourl', (req, res) => {

  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./catTourl.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
})

app.get('/catvis', (req, res) => {
  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./VisualizeCat.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
  });
})

app.get('/ml', (req, res) => {

  const { spawn } = require('child_process');
  const pyProg = spawn('python', ['./ml.py']);

  pyProg.stdout.on('data', function(data) {
    console.log(data.toString());
    res.write(data);
    res.end('end');
  });
})
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});


mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3800, function(){
 console.log('Node server listening on port 3800');
});

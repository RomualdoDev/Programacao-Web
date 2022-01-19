var express = require('express');
var router = express.Router();
var pegaJSON = require('get-json');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/novoAero', function (req, res, next) {
  res.render('newAero', { title: 'Cadastro' });
});

router.get('/aeroportos', function (req, res, next) {
  var db = require("../db");

  var aeroportos = db.Mongoose.model('aerocollection', db.UserSchema, 'aerocollection');
  aeroportos.find({}).lean().exec(
    function (e, docs) {
      res.render('aeroportos', { "result": docs });
    });
});

router.post('/addAero', function (req, res) {

  var db = require("../db");
  var aeroName = req.body.aeroporto;
  var aeroCid = req.body.cidade;

  var aeroportos = db.Mongoose.model('aerocollection', db.UserSchema, 'aerocollection');
  var aero = new aeroportos({ aeroporto: aeroName, cidade: aeroCid });
  aero.save(function (err) {
    if (err) {
      console.log("Error! " + err.message);
      return err;
    }
    else {
      res.redirect("aeroportos");
    }
  });
});

router.post('/proAero', function (req, res) {
  var db = require("../db");
  var aero = req.body.aeroporto;
  var aeroportos = db.Mongoose.model('aerocollection', db.UserSchema, 'aerocollection');
  aeroportos.find({ aeroporto: { $eq: aero } }).lean().exec(
    function (error, docs) {
      if (error) {
        res.render('error', { 'error': error });
      } else {
        console.log(docs[0].cidade);
        pegaJSON("http://api.openweathermap.org/data/2.5/weather?q=" + docs[0].cidade + "&APPID=e76640974d8f2f3ed7f25826579ad15c")
          .then(function (response) {
            res.render('result', { "result": response.main });
          })
          .catch(function (e) { console.log("Falha na requisição:" + JSON.stringify(e)) });
      }
    });
});

router.post('/delete', function (req, res, next) {
  var db = require("../db");
  var aeroName = req.body.aeroporto;
  var aeroportos = db.Mongoose.model('aerocollection', db.UserSchema, 'aerocollection');
  aeroportos.remove({ aeroporto: { $eq: aeroName } }, function (error) {
    if (error) {
      res.render('error', { error: error });
      return error;
    }
    else {
      res.redirect("aeroportos");
    }
  });
});
module.exports = router;

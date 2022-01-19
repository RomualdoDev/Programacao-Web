var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('newuser', { title: 'New User' });
});

router.get('/del', function (req, res, next) {
    res.render('deluser', { title: 'Delete' });
});

router.get('/edit', function (req, res, next) {
    res.render('edituser', { title: 'Update' });
});

router.get('/clientes', function (req, res) {
    var db = require("../db");
    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    Users.find({}).lean().exec(
        function (e, docs) {
            res.render('userlist', { "userlist": docs });
        });
});

router.post('/addcliente', function (req, res) {

    var db = require("../db");
    var userName = req.body.nome;
    var userCPF = req.body.cpf;

    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    var user = new Users({ nome: userName, cpf: userCPF });
    user.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            res.redirect("clientes");
        }
    });
});

router.post('/update', function (req, res, next) {
    var db = require("../db");

    var userName = req.body.nome;
    var userCPF = req.body.cpf;
    var id = req.body.id;
    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    Users.updateOne({ _id: id }, { nome: userName, cpf: userCPF }, function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Updated");
            res.redirect("clientes");
        }
    });
});

router.post('/delete', function (req, res, next) {
    var db = require("../db");
    var clienteCPF = req.body.cpf;
    var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
    Users.remove({ cpf: clienteCPF }, function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Updated");
            res.redirect("clientes");
        }
    });

});

module.exports = router;

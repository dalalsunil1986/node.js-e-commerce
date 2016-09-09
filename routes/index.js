var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('front/index', { title: 'NodeJS with MongoDB' });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('front/login', { title: 'Login' });
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('front/register', { title: 'Register' });
});

/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render('front/products', { title: 'Product' });
});

/* GET User Account page. */
router.get('/user/account', function(req, res, next) {
  res.render('user/account', { title: 'Account' });
});

/* GET User Products page. */
router.get('/user/products', function(req, res, next) {
  res.render('user/products', { title: 'My Products' });
});

/* GET User Products Add page. */
router.get('/user/products/add', function(req, res, next) {
  res.render('user/products-add', { title: 'Add Product' });
});

/* GET User Products Edit page. */
router.get('/user/products/edit', function(req, res, next) {
  res.render('user/products-edit', { title: 'Edit Product' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    /* Set our internal DB variable */
    var db = req.db;

    /* Get our form values. These rely on the "name" attributes */
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    /* Set our collection */
    var collection = db.get('usercollection');

    /* Submit to the DB */
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            /* If it failed, return error */
            res.send("There was a problem adding the information to the database.");
        }
        else {
            /* And forward to success page */
            res.redirect("userlist");
        }
    });
});

module.exports = router;

// File: /app.js

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var username = 'testing123';

app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use( bodyParser.json() );
app.use( express.static( path.join(__dirname, 'public') ) );
app.use( bodyParser.urlencoded({ extended: false }) );



app.use( '/api', require('./api/routes/index') );


app.get('/', function(req, res) {
    res.render('index', { title: 'Home | Smart Financial Research' });
});

app.get('/news', function(req, res) {
    res.render('news', { title: 'News | Smart Financial Research'});
});

app.get('/investing', function(req, res) {
    res.render('investing', { title: 'Investing | Smart Financial Research'});
});

app.get('/learning', function(req, res) {
    res.render('learning', { title: 'Learning | Smart Financial Research'});
});

app.get('/about', function(req, res) {
    res.render('about', { title: 'About | Smart Financial Research'});
});

app.get('/contact', function(req, res) {
    res.render('contact', { title: 'Contact | Smart Financial Research'});
});

//this is broken and not used at the moment
//I am going with the API page instead of this
//logging in gives you API access (though it's not really secured if you know the link)
app.get('/notverysecureadminpage', function(req, res) {
    res.render('notverysecureadminpage', { title: 'Admin Page | Smart Financial Research'});
});

app.get('/stephen', function(req, res) {
    res.render('stephen', { title: 'Stephen Smart | Smart Financial Research'});
});

app.get('/alan', function(req, res) {
    res.render('alan', { title: 'Alan | Smart Financial Research'});
});

//I might not use the archive pages after all (extra feature I had planned)
app.get('/learning-archive', function(req, res) {
    res.render('learning-archive', { title: 'Learning Archive | Smart Financial Research'});
});
app.get('/news-archive', function(req, res) {
    res.render('news-archive', { title: 'News Archive | Smart Financial Research'});
});
app.get('/investing-archive', function(req, res) {
    res.render('investing-archive', { title: 'Investing Archive | Smart Financial Research'}, {username: username});
});


app.get('/login', function(req, res) {
    res.render('login', { title: 'Login' });
});

app.get('/quote', function(req, res) {
    // First authenticate user: stephensmart OR alan, pwd: password
    var usr = req.query.usr;
    var pwd = req.query.pwd;
    var username = "test";
    if (usr === 'stephensmart' && pwd === 'password') {
        username = 'Stephen Smart';
        //res.status(200).json({ quote: "Click <a href=\"notverysecureadminpage\">here</a> to log in"});
        res.status(200).json({ quote: "Click <a href=\"api\">here</a> to log in"});
        //res.render('notverysecureadminpage', { title: 'Admin Page | Smart Financial Research'});
        //res.send({username: 'Stephen Smart'});
    } else if (usr === 'alan' && pwd === 'password') {
        username = 'Alan';
        //res.status(200).json({ quote: "Click <a href=\"notverysecureadminpage\">here</a> to log in"});
        res.status(200).json({ quote: "Click <a href=\"api\">here</a> to log in"});
    } else {
        res.json( { error: "Invalid login details." });
    }
});



app.listen(3000, 'localhost', function() { console.log("Listening on localhost:3000"); });


const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

// connecting to the database and setting up
var mongoDB = 'mongodb://127.0.0.1:27017/flashcard';
mongoose.connect(mongoDB, { useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;
var cardSchema = new Schema({
    question: String,
    answer: String,
    hint: String
});
var cardModel = mongoose.model('cards', cardSchema);

router.get('/', (req, res) => {
    username = req.cookies.username;
    if(username){
        res.render('index', {name: username});
    } else {
        res.redirect('/login');
    }
});

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.post('/login', (req, res) => {
    username = req.body.username;
    res.cookie("username", username);
    res.redirect('/');
});

router.get('/cards', (req, res) => {
    cardModel.find({}, {}).exec(
        function(err, card) 
        {
            if(err) return Error(err); 
            let length = card.length;
            let index;
            if(req.query.id)
            {
                index = req.query.id;
            }
            else
            {
                index = Math.floor(Math.random()*length);
            }
            let question = card[index].question;
            let answer = card[index].answer;
            let hint = card[index].hint;
            res.render('card', {question, answer, hint}) 
        }
    );
});

module.exports = router;
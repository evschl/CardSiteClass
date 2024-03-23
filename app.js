const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const marketRoutes = require('./routes/marketRoutes');

//create app
const app = express();

//configure app
let port = 5000;
let host = 'localhost';
let url = 'mongodb+srv://eschlee:jRzpfuRZEG2zxjzy@cluster0.bk7hkvj.mongodb.net/nbda-project3?retryWrites=true&w=majority&appName=Cluster0';
app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect(url)
.then(()=>{
    app.listen(port, host, ()=>{
        console.log("Server is running on port", port);
        console.log(url);
    });
})
.catch(err=>console.log(err.message));

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use('/items', marketRoutes);

app.use((req, res, next)=>{
    let err = new Error("The server cannot locate " + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack)
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});
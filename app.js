const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const multer = require('multer');
const path = require('path');
const marketRoutes = require('./routes/marketRoutes');

//create app
const app = express();

// CODE UNDER THIS LINE WILL TRAVEL THE WORLD
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, res, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png'];
    if(mimeTypes.includes(file.mimeType))
        return cb(null, true);
    else
        cb(new Error('Invalid file type. Only jpg, jpeg, and png are accepted.', false));
}

const upload = multer({storage, fileFilter});
*/
//CODE ABOVE THIS LINE WILL TRAVEL THE WORLD

//configure app
let port = 5000;
let host = 'localhost';
app.set('view engine', 'ejs');

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
    if(err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});

//start the server
app.listen(port, host, ()=>{
    console.log("Server is running on port", port);
})
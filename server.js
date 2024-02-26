const mongoose = require('mongoose')
const express = require('express');
const nocache = require('nocache');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


const app = express();
// app.use(fileupload());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const path = require('path');


app.set('view engine', 'ejs');

app.set('views', './views/user');



app.use(nocache());
app.use('/static', express.static(path.join(__dirname,'public')));
app.use('/static', express.static(path.join(__dirname, 'public/assets')));

app.use((req, res, next) => {
    res.header('Cache-Control', 'no-store, private, must-revalidate');
    next();
});



app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
}))


// User router
const userRouter = require('./routes/userRoutes')
app.use('/', userRouter);

// Admin router

const adminRouter = require('./routes/adminRouter');
app.use('/admin', adminRouter);




// connecting database
mongoose.connect('mongodb://127.0.0.1:27017/Costmer')
.then(() => {
    console.log('DB connected');
})
.catch((err) => {
    console.log(err);
})



app.listen(3080, () => {
    console.log('http://localhost:3080')
})
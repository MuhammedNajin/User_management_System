const Product = require('../models/addproduct');

//Register a user

const registerUser = async (req, res) => {
    try {
        res.redirect('/login');

    } catch (error) {
        console.log(error);
        
    }
}



// login page handiler function 

const getLogin = async (req, res) => {

    try {
        if(req.query.message === "User does'nt exists") {
            const error = req.query.message;
            res.render('login', {error});

           
        } else if(req.query.message === "Incorrect password") {
            const error = req.query.message;
            res.render('login', {error});

        } else {
            const error = req.query.message || '';
            res.render('login', {error});
        }
        
    } catch (error) {

        console.log(error);
        
    }
}


// user register

const getSignup = async (req, res)  => {
    try {
        if(req.query.message === 'Email already exists') {
            const error = req.query.message;
            res.render('signup', {error});

           
        } else {
            const error = req.query.message || '';
            res.render('signup', {error});

        }
      
    } catch (error) {

        console.log(error);
        
    }
}



// home page

const getHome = async (req, res) => {
    try {
        const product = await Product.find();
        res.render('home', {user: req.session.user, product});

    } catch (error) {

        console.log(error);
    }
}


//login 

const userLogin = async (req, res) => {
    try {

        res.redirect('/');
        
    } catch (error) {
        console.log(error);
        
    }

}


const userLogout = async (req, res) => {
    try {
        req.session.user = null;
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        
    }
}



module.exports ={
    getLogin,
    getHome,
    getSignup,
    registerUser,
    userLogin,
    userLogout
    
}
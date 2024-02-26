
const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const session = require('express-session');

// checking email and  creating user
const creatingUser = async (req, res, next) => {
    try {
        const emailCheck = await User.findOne({ Email: req.body.email });
        if (emailCheck) {

            res.redirect('/signup?message=' + encodeURIComponent("Email already exists"));
            console.log("same email")
            return;
        } else {
            
            const hash = await bcrypt.hash(req.body.password, 10);
            console.log(hash)

            const user = new User({

                Name: req.body.uname,
                Email: req.body.email,
                Password: hash,
                isAdmin: false

            });

            const isSaved = await user.save();
            console.log(isSaved);

            if (isSaved) {
                next();
                console.log("HIIIII")
            } else {
                console.log('Somthing went wrong From user sign up')
            }



        }

    } catch (error) {
        console.log(error);

    }
}

//checking superadmin 

const isSuperAdmin = (req, res, next) => {
    try {
        const credential = {
            Email: "superAdmin@gmail.com",
            Password: "Admin123"
        }

        if(req.body.email === credential.Email && req.body.password === credential.Password) {
            req.session.super = credential.Email;
            res.redirect('/admin/superAdmin');
            
        } else {
            return next();
        }
    } catch (error) {
        console.log(error)
    }
}


// User authentication

const userAuth = async (req, res, next) => {
    try {
        if(req.session.user) {
            res.redirect('/');
        }
       const user = await User.findOne({Email: req.body.email});
       if(user) {
          const passwordCheck = await bcrypt.compare(req.body.password, user.Password);

          if(passwordCheck){
            req.session.user = user.Email;
            return next();

          } else {
            // Wrong password
            // alert('Enter correct password');
              res.redirect('/login?message=' + encodeURIComponent("Incorrect password"));
          }

       } else {
        
         res.redirect('/login?message=' + encodeURIComponent("User does'nt exists"));
         console.log("User doest not exits")
       }

        
    } catch (error) {
       console.log(error); 
    }
}


// Session handling

const isLoged = async (req, res, next) => {

    if(req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }

}

// checking there is  session or not if user same page other wise redirect to  same page
const verify = (req, res, next) => {
    try {

        if(!req.session.user) {
        return next();

        } else {

            res.redirect('/');
        }
    } catch (error) {
        
    }
}


const back = async (req, res, next) => {
    try {
        if(req.session.admin) {
            res.redirect('/admin/');
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
    }
}

const verifySuperAdmin = (req, res, next) =>{
    try {
        if(!req.session.super) {
             next();
        } else {
            res.redirect('/admin/superAdmin');
        }
    } catch (error) {
        console.log(error)
    }
}

console.log('helooe')
module.exports = {
    creatingUser,
    isLoged,
    userAuth,
    verify,
    back,
    isSuperAdmin,
    verifySuperAdmin


}
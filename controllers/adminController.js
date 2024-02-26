const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const Product = require('../models/addproduct');

// 
const adminLogin = async (req, res) => {
    try {

        const Admin = await User.findOne({Email: req.body.email})
        if(Admin) {
                 
            const passwordCheck = await bcrypt.compare(req.body.password, Admin.Password);
            if(passwordCheck) {

                if(Admin.isAdmin) {
                    req.session.admin = Admin.Email;
                    res.redirect('/admin/');
                } else {
                    res.redirect('/admin/login?message=' + encodeURIComponent("You are not a admin"));
                }
               
      
              } else {
                res.redirect('/admin/login?message=' + encodeURIComponent("Enter correct password"));
              }
        } else {
                console.log('Email doesnt exits')
                res.redirect('/admin/login?message=' + encodeURIComponent("Email does'nt exits"));
        }
        
    } catch (error) {
        console.log(error)
        
    }
}


// get admin login page

const getAdminLogin = async (req, res) => {
    try {


        if(req.query.message === 'Enter correct password') {
            const message = req.query.message;
            res.render('adminLogin', {message});
        } else if(req.query.message === "Email does'nt exits") {

            const message = req.query.message;
            res.render('adminLogin', {message});

        } else if(req.query.message === 'You are not a admin') {
            const message = req.query.message;
            res.render('adminLogin', {message});

           
        } else {
            const logout = req.query.message || '';
            res.render('adminLogin', {logout});

        }
       
    } catch (error) {
        console.log(error);
        
    }
}


// admin home page rendering 
const adminHome = async (req, res) => {
    try {
        const product = await Product.find();
          
        res.render('adminHome', {product, req });
    } catch (error) {
        console.log(error);
        
    }
}


// admin logout
const adminLogout = async (req, res) => {
    try {
       req.session.admin = null;
       res.redirect('/admin/login?message=' + encodeURIComponent("Logout successfully..."));
       
    } catch (error) {
        console.log(error);
        
    }
}


// get edit page
const editUser = async (req, res) => {
    try {
        const user = req.query.id;
        console.log(user);
         const userData = await User.findOne({_id: user});
         console.log('getUpdate :', userData);
         
          if(userData) {
           return res.render('editUser', {user: userData});
          }else {
           return res.redirect('/admin/');
            console.log('Called...')
          }
    } catch (error) {
        console.log(error);
        
    }
}


// updating the user 


const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('update route', id);
        const updateUser =  await User.findByIdAndUpdate({_id:id},

            {
             Name:req.body.name,
             Email:req.body.email,
          });

            if(updateUser) {
                res.redirect('/admin/?message=' + encodeURIComponent("update successfully..."));
            }
            else {
                res.redirect('/admin/update');
                
            }
    } catch (error) {
        console.log(error)
    }
}


// get addd users page

const adminAddUser = async (req, res) => {
    try {

        if(req.query.message === 'Email already exists') {
            const exsits = req.query.message;
            res.render('createUser', {exsits});

           
        } else if(req.query.message === 'New user created sucessfully...') {
             
            const updated = req.query.message;
            res.render('createUser', {updated});

        } else {
            const updated = req.query.message || '';
            res.render('createUser', {updated});
        }
        
    } catch (error) {
        console.log(error);
    }
}

// Creating users
const createUser = async (req, res) => {
    try {
        const email = await User.findOne({Email: req.body.email});
        if(email){
            res.redirect('/admin/addUser?message=' + encodeURIComponent("Email already exists"));
            console.log('same user');

        } else {
            const hashPass = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                Name: req.body.name,
                Email: req.body.email,
                Password: hashPass,
                isAdmin: false,

            })

            const check = await user.save();
            if(check) {
                res.redirect('/admin/addUser?message=' + encodeURIComponent("New user created sucessfully..."));
            } else {
                console.log('User not created')
            }
        }
            
    } catch (error) {
        console.log(error);
    }
}


// delete user 

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id})
        res.redirect('/admin/')
    } catch (error) {
        console.log(error)
    }
}


// make admin


const superAdminLogout = (req, res) => {
    try {
        req.session.super = null;
        res.redirect('/login');
    } catch (error) {
        console.log(error)
    }
}
 
const makeAdmin = async (req, res) => {
    try {
        const id = req.params.id;
         const user = await User.findOne({_id: id});
        if(user.isAdmin === true) {
            res.redirect('/admin/superAdmin?message=' + encodeURIComponent(`${user.Name} already an  admin`));
        } else {
            await User.updateOne({_id: id},
                {$set: {isAdmin: true}})
                res.redirect('/admin/superAdmin?message=' + encodeURIComponent(`${user.Name} is an admin now`));
        }
       
    } catch (error) {
        console.log(error)
    }
}

const removeAdmin = async (req, res) => {
    try {
        console.log('HIIIIIIIIIIIII')
        const id = req.params.id;
        console.log('Hello')

        const user = await User.findOne({_id: id}) 
        if(user.isAdmin === false) {
            res.redirect('/admin/superAdmin?message=' + encodeURIComponent(`${user.Name} is not a admin`));
        } else {
            await User.updateOne({_id: id},
                {$set: {isAdmin: false}});
                res.redirect('/admin/superAdmin?message=' + encodeURIComponent(`removed ${user.Name} from admin`));
        }
       
    } catch (error) {
       console.log(error)  
    }
}

const getSuperAdmin = async (req, res) => {
    try {
       const user = await User.find();
        res.render('superAdmin',{users: user, req})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    adminLogin,
    adminHome,
    getAdminLogin,
    adminLogout,
    editUser,
    updateUser,
    adminAddUser,
    createUser,
    deleteUser,
    removeAdmin,
    makeAdmin,
    getSuperAdmin,
    superAdminLogout,
    // addProduct
}
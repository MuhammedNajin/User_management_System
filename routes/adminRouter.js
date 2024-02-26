const express = require('express');
const adminRouter = express();
const adminController = require('../controllers/adminController');
const middleware = require('../middlewares/admin');
const productController = require('../controllers/addProduct');

const noCache = require('nocache')
const multer = require("multer");
const addproduct = require('../models/addproduct');


adminRouter.use(noCache());

adminRouter.use(express.json());
adminRouter.use(express.urlencoded({ extended: true }));

adminRouter.set('view engine', 'ejs');
adminRouter.set('views', './views/admin');

adminRouter.use((req, res, next) => {
    res.header('Cache-Control', 'no-store, private, must-revalidate');
    next();
});

// admin login page
adminRouter.post('/login', adminController.adminLogin);

//get login page
adminRouter.get('/login',middleware.verifyAdmin ,adminController.getAdminLogin);


//admin home page
adminRouter.get('/',middleware.isAdminLoged, adminController.adminHome);


// admin logout
adminRouter.get('/logout', adminController.adminLogout);


// edit user 
adminRouter.get('/update',middleware.isAdminLoged, adminController.editUser);

// edit user 

adminRouter.post('/update/:id', adminController.updateUser);

//add user 

adminRouter.get('/addUser',middleware.isAdminLoged, adminController.adminAddUser);

//creating user

adminRouter.post('/addUser', adminController.createUser);

//add product 
 

adminRouter.get('/add-product', (req, res) => {
    res.render('add-product');
})

// file upload  

const storeImage  = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, 'public/product-image/');
    },
    filename: (req, file, cb) => {
        
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storeImage});

adminRouter.post('/add-product',upload.single('Image'), productController.addProduct);

//delete the user 

adminRouter.get('/deleteUser/:id', adminController.deleteUser);


//super admin can make user admin and remove


adminRouter.get('/superLogout', adminController.superAdminLogout);

adminRouter.get('/superAdmin',middleware.superSession, adminController.getSuperAdmin);

adminRouter.get('/makeAdmin/:id', adminController.makeAdmin);

adminRouter.get('/removeAdmin/:id', adminController.removeAdmin);


module.exports = adminRouter;
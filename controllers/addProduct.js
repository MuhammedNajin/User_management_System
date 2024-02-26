const Product = require('../models/addproduct');


const addProduct = async (req, res) => {
    try {

     
        console.log(req.body);
        console.log(req.file);
        console.log(req.file.filename)
        const addProduct = new Product({
            productName: req.body.name,
            cetagory: req.body.catagory,
            price: req.body.price,
            description: req.body.discription,
            image: req.file.originalname,  
        })
        return addProduct.save()
        .then((isadmin) => {
            try {
                if(isadmin) {
                    res.redirect('/admin/add-product')
                }
            } catch (error) {
                
            }
        })
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    addProduct,
}
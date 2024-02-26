

const isAdminLoged = (req, res, next) => {
    try {
        if(req.session.admin) {
           return next();
        } else {
            res.redirect('/admin/login')
        }
    } catch (error) {
        console.log(error)
    }
}

const verifyAdmin = (req, res, next) => {
    try {
        if(!req.session.admin) {
          return  next();
        } else {
            res.redirect('/admin/')
        }
    } catch (error) {
        console.log(error)
    }
}

const superSession = (req, res,next) =>{
    try {
        if(req.session.super) {
            next()
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error)
        
    }
}



module.exports = {
    isAdminLoged,
    verifyAdmin,
    superSession
    
}
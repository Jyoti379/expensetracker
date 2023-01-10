const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token,'secretkey') ;
        console.log('uerId=',user.userId)
        User.findByPk(user.userId).then(user => {
           // console.log(JSON.stringify(user));
            console.log(user.id)
            req.user = user; 
            console.log(req.user)
             //added the user value to req body so that it is available globally for/getexpenses controllers
            next();
        }).catch(err => { throw new Error(err)})

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
      }

}


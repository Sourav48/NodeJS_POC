const jwt = require('jsonwebtoken');
const SECRETKEY = "secretcode@123"

const auth = (req, res, next) => {

    const bearerHeader=req.headers['authorization'];

    if(typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split(' ');
        req.token=bearer[1];
           jwt.verify(req.token,SECRETKEY,(err, token) =>{
                if(err) {
                    res.send(err);
                }
                else{
                    next();
                }
            })  
    }
    else{
        res.send("Token not provided");
    }
  
};

module.exports = auth
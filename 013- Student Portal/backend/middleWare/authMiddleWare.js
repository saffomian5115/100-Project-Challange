const jwt = require('jsonwebtoken');

const secretKey = 'Sarfraz Pro-Dev';

function authMiddleWare(req, res, next){
    const head = req.hearders['authorization'];
    const token = head && head.split(' ')[1];
    if(!token) return res.json({message:'token not present, access denied'})
    try{
        const decode = jwt.verify(token, secretKey);
    req.user = decode;
    next();
    } catch(err){
        return res.status(401).json({message: 'invalid token'})
    }
}

function adminMiddleWare(req, res, next){
    const admin = req.user.role;
    if(admin !== 'admin'){
        return res.status(403).json({message:'access denied'})
    }
    next();
}

module.exports = {authMiddleWare, adminMiddleWare};
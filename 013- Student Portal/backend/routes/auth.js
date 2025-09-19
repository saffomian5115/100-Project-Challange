const db = require('../db')
const express = require('express');
const router = express.Router();
const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'Sarfraz Pro-Dev';

router.post('/signup', (req, res)=>{
    const {name, email, password, role} = req.body;
    if(!name || !email || !password || !role) return res.status(400).json({message:"no field should be empty."})
    db.query("select * from users where email = ?", [email],async (err, result)=>{
        if(err) return res.status(500).json({message: "Server error"})
        if(result.length > 0) return res.status(403).json({message:'Email already exist.'})
        const passwordCrypt = await crypt.hash(password, 10)
        db.query('insert into users (name, email, password, role) values (?, ?, ?, ?)',[name, email, passwordCrypt, role], (err, result)=>{
            if(err) return res.status(500).json({message:"server error"})
            db.query("select * from users where email = ?", [email], (err, result)=>{
                if(err) return res.status(500).json({message: "Server error"})
                res.json({message:"Signup Successfully."})
            })
        })
    })
})

router.post('/login', (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({message: 'no field should empty'})
    db.query('select * from users where email = ?', [email],async (err, result)=>{
        if(err) return res.status(500).json({message:'server error'})
        if(result.length === 0) return res.status(404).json({message:'email not exist'})
        const isUser = await crypt.compare(password, result[0].password)
        if(!isUser) return res.status(401).json({message:'Password is Incorrect'})
        const user1 = result[0];
        const token = jwt.sign({
            id:user1.id,
            email: user1.email,
            role: user1.role},
            secretKey,
            {expiresIn:'7d'}
        )
        
        res.json({message:'Login successfully', token,role: result[0].role} )
    })
})

module.exports = router;
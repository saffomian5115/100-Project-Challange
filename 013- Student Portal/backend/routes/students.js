const express = require('express');
const router = express.Router();
const db = require('../db');
const { authMiddleWare, adminMiddleWare } = require('d:/Temoprary/013-student-api/backend/middleWares/authMiddleWare');

router.get('/', (req, res)=>{
    db.query('select * from students', (err, result)=>{
        if(err) return res.status(500).json({message:'server error'})
        res.json(result)
    })
})

router.post('/',authMiddleWare,adminMiddleWare, (req, res)=>{
    const {name, email, department} = req.body;
    if(!name || !email || !department) return res.status(400).json({message:'no field empty'})
    db.query('select * from students where email = ?', [email], (err, result)=>{
        if(err) return res.status(500).json({message:'server error'})
        if(result.length >0) return res.json({message:'email already exists.'})
        db.query('insert into students (name, email, department) values (?, ?, ?)',[name, email, department], (err, result)=>{
            if(err) return res.status(500).json({message:'server error'})
            res.json({message:'insert successfully.'})    
        })   
    })
})

router.put('/:id',authMiddleWare,adminMiddleWare, (req, res)=>{
    const id = req.params.id;
    const {name, email, department} = req.body;
    if(!name || !email || !department) return res.status(400).json({message:'no field empty'})
    db.query('select * from students where id = ?', [id], (err, result)=>{
        if(err) return res.status(500).json({message:'server error'})
        if(result.length ===0) return res.status(404).json({message:'student not found'})
        db.query('update students set name=?, email=?, department=? where id=?',[name, email, department,id], (err, result)=>{
            if(err) return res.status(500).json({message:'server error'})
            if(result.affectedRows === 0) return res.status(201).json({message:'No student update'})
            res.json({message:'update successfully.'})    
        })   
    })
})
router.delete('/:id',authMiddleWare,adminMiddleWare, (req, res)=>{
    const id= req.params.id;
    db.query('delete from students where id = ?', [id], (err, result)=>{
        if(err) return res.status(500).json({message:'server error'})
        res.json({message:'delete student successfully.'})
    })
})

module.exports = router;
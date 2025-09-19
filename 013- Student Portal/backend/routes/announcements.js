const express = require('express')
const router = express.Router();
const db = require('../db');
const { adminMiddleWare, authMiddleWare } = require('d:/Temoprary/013-student-api/backend/middleWares/authMiddleWare');

router.get('/', (req, res)=>{
    db.query('select * from announcements', (err, result)=>{
        if(err) return res.status(500).json({message:"server error"})
        if(result.length === 0) return res.json({message:'There is no Announcements'})
        res.json({result})
    })
})

router.get('/:id', (req, res)=>{
    const id= req.params.id;
    db.query('select * from announcements where id= ?', [id], (err, result)=>{
        if(err) return res.status(500).json({message:"server error"})
        if(result.length === 0) return res.status(404).json({message:'There is no Announcements'})
        res.json(result)
    })
})


router.post('/',authMiddleWare,adminMiddleWare, (req, res)=>{
    const {title, message} = req.body;
    if(!title || !message) return res.status(400).json({message:'no field should be empty'})
    db.query('insert into announcements (title, message) values (?, ?)', [title, message], (err, result)=>{
        if(err) return res.status(500).json({message:'server error'})
        res.json({message:'add successfully.'})
    })
})

router.put('/:id',authMiddleWare, adminMiddleWare, (req, res)=>{
    const id = req.params.id;
    const {title, message} = req.body;
    if(!title || !message) return res.status(400).json({message:'no field should be empty'})
    db.query('update  announcements set title=?, message=? where id = ?', [title, message, id], (err, result)=>{
        if(err) return res.status(500).json({message:'server error'})
        if(result.affectedRows === 0) return res.status(404).json({message:'Not update!'})
        res.json({message:'update successfully.'})
    })
})

router.delete('/:id',authMiddleWare, adminMiddleWare, (req, res)=>{
    const id = req.params.id;
    db.query('delete from announcements where id = ?', [id], (err, result)=>{
        if(err) return res.status(500).json({message:'server err'})
        res.json({message:'delete successfully'})
    })
})

module.exports = router;


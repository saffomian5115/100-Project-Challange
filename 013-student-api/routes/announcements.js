const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res)=>{
    db.query('select * from announcements', (err, result)=>{
        if(err) return res.status(500).json({error: err.message});
        return res.json(result);
    })
})

router.get('/:id', (req, res)=>{
    const id = req.params.id;
    db.query('select * from announcements where id = ?', id, (err, result)=>{
        if(err) return res.status(500).json({error: err.message});
        if(result.length === 0) return res.status(404).json({error: 'id not found.'})
        return res.json({result});
    })
})

router.post('/', (req, res)=>{
    const {title, message, date} = req.body;
    if(!title || !message) return res.status(400).json({error: 'fields not be empty.'});
    if(!date){
         const query = 'insert into announcements (title, message) values (?, ?)';
        db.query(query, [title, message], (err, result)=>{
            if(err) return res.status(500).json({error: err.message});
            return res.status(201).json({
                id: result.insertId,
                title, message    
            })
        })
        }
    else {
        const query = 'insert into announcements (title, message, date) values (?, ?, ?)';
        db.query(query, [title, message, date], (err, result)=>{
            if(err) return res.status(500).json({error: err.message});
            return res.status(201).json({
                id: result.insertId,
                title, message, date        })
            })
        }
})

router.put('/:id', (req, res)=>{
    const id = req.params.id;
    const {title, message, date} = req.body;
    if(!title || !message) return res.status(400).json({error: 'fields not be empty.'});
    const query = 'update announcements set title=?, message=?, date=? where id= ?';
    db.query(query, [title, message, date, id], (err, result)=>{
        if(err) return res.status(500).json({error: err.message});
        if(result.affectedRows === 0) return res.status(404).json({error: 'id not found.'})
        return res.status(201).json({
            id: id,
            title, message, date
        })
    })
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    db.query('delete from announcements where id = ?', id, (err, result)=>{
        if(err) return res.status(500).json({error: err.message});
        if(result.affectedRows === 0) return res.status(404).json({error: 'id not found'});
        return res.json({
            completed: `${result.affectedRows} row affected.`
        })
    })
})

module.exports = router;
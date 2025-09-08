const express = require('express');
const db = require('../db');

const router = express.Router();


router.get('/', (req, res)=>{
    const query = 'select * from students';
    db.query(query, (err, result)=>{
        if(err) return res.status(500).json({ error: err.message})
        res.json(result);
    })
});

router.get('/:id', (req, res)=>{
    const id = req.params.id;
    const query = 'select * from students where id= ?';
    db.query(query,[id], (err, result)=>{
        if(err) return res.status(500).json({ error: err.message})
        if(result.length === 0) return res.status(404).json({'message': 'id is not found.'})
        res.json(result);
    })
});

router.post('/', (req, res)=>{
    const {name, email, department} = req.body;
    if(!name || !email || !department) return res.status(400).json({error: 'All fields should fill.'})

    const query = 'insert into students (name, email, department) values (?, ?, ?)';

    db.query(query, [name, email, department], (err, result)=>{
        if(err) return res.status(500).json({errer: err.message});
        res.status(201).json({
            id: result.insertId,
            name,email,department
        });
    })
});

router.put('/:id', (req, res)=>{
    const id= req.params.id;
    const {name, email, department} = req.body;
    if(!name || !email || !department) return res.status(400).json({error: 'all field are required.'});

    const query = 'update students set name = ?, email = ?, department=? where id = ?';
    db.query(query, [name, email, department, id], (err, result)=>{
        if(err) {
            return res.status(400).json({error: err.message})
        }
        if(result.insertId === 0) return res.status(400).json({error: 'student not found.'});
        res.json({
            id: result.insertId,
            name, email, department
        })
    })
});

router.delete('/:id', (req, res)=>{
    const id= req.params.id;
    const query = 'delete from students where id = ?';

    db.query(query, [id], (err, result)=>{
        if(err) return res.status(500).json({error: err.message});
        if(result.affectedRows === 0) return res.status(404).json({error: 'id not found.'});
        res.json({delete: `${result.affectedRows} rows are deleted.`
        })
    })
})

module.exports = router;
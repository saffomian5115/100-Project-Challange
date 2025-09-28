import express from 'express'
import db from '../db.js'

const router = express.Router();

router.get('/', (req, res)=>{
    const {sort = 'uploadTime', order = 'desc'} = req.query;

    const validSort = ['filename', 'size', 'uploadTime', 'type']
    const sortBy = validSort.includes(sort)? sort:'uploadTime';

    db.query(`select * from gallery order by ${sort} ${order==='asc'? 'asc':'desc'}`, (err, result)=>{
        if(err) return res.status(500).json({error:err})
        res.json(result)
    });
})

export default router;
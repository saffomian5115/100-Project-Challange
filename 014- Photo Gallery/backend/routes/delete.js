import express from 'express'
import fs from 'fs'
import db from '../db.js'

const router = express.Router();

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    db.query('select * from gallery where id=?', [id], (err, result)=>{
        if(err) return res.status(500).json({error:err})
        if(result.length===0) return res.status(404).json({message:'data not found'})
        const d = result[0];

        fs.unlink(d.url, (err)=>{
            if(err) return res.status(500).json({error:err})
            fs.unlink(d.thumbUrl, (err)=>{
                if(err) return res.status(500).json({error:err})
                db.query('delete from gallery where id = ?', [id], (err, result)=>{
                    if(err) return res.status(500).json({error:err})
                    res.json({message:'delete successfully.', result})
                })
            })
        })
    })
})

export default router;
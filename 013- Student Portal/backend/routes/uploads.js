const express = require('express')
const db = require('../db')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/imgs')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb)=>{
    const allowed = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();

    if(allowed.test(ext)) cb(null, true)
    else cb(new error('Only png, jpg and jpeg allowed.'), false)
}

const uploads = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits: {fileSize:5*1024*1024}
})

router.get('/', (req,res)=>{
    db.query('select * from uploads', (err, result)=>{
        if(err) return res.status(500).json({error:err.message})
        res.json(result)
    })
})

router.post('/', uploads.single('myFile'), (req, res)=>{
    const {filename, path, size, mimetype} = req.file;
    db.query('insert into uploads (name, path, size, type) values (?,?,?,?)', [filename, path, size, mimetype], (err, result)=>{
        if(err) return res.status(500).json({error:err.message})
        res.json({message:'upload successfully'});
    })
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id;

    db.query('select path from uploads where id =?', [id], (err,result)=>{
        if(err) return res.status(500).json({error: err.message})
        if(result.length === 0) return res.status(404).json({message:'file not found'})
        
        const filepath = result[0].path;

        fs.unlink(filepath, (err)=>{
            if(err) return res.status(500).json({error:err.message})
            db.query('delete from uploads where id = ?', [id], (err, result)=>{
                if(err) return res.status(500).json({error: err.message})
                res.json({message: 'delete successfully.'})
            })
        })
    })  
})

module.exports = router;
import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import db from '../db.js'

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/originals')
    },
    filename: (req, file, cb)=>{
        const uniqueName = Date.now()+path.extname(file.originalname);
        cb(null, uniqueName)
    }
})

const fileFilter = (req, file, cb)=>{
    const allowed = /png|jpg|jpeg|gif/;
    const ext = path.extname(file.originalname);
    if(allowed.test(ext)){
        cb(null, true)
    }
    else {
        cb(new error('This file type is not allowed.'), false)
    }
}

const uploads = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:10*1024*1024}
})

router.post('/', uploads.array('images', 10), async (req, res)=>{
    const files = req.files;
    for(const file of files){
        const thumbUrl = `uploads/thumbnails/thumb-${file.filename}`;
        const {filename, size, mimetype, path} = file;

        await sharp(file.path)
        .resize(200)
        .toFile(thumbUrl)

        db.query('insert into gallery (filename, url, thumbUrl, size, type) values (?,?,?,?,?)',[filename, path, thumbUrl, size, mimetype], (err, result)=>{
            if(err) return res.status(500).json({error: err})
        })
    }
    res.json({message:'upload successfully'})
})

export default router;
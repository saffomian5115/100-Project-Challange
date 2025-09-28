const express = require('express');
const db = require('./db');
const cors = require('cors');
const authRouter = require('./routes/auth');
const announcementsRouter = require('./routes/announcements');
const studentsRouter = require("./routes/students")
const uploadsRouter = require('./routes/uploads')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/auth', authRouter)
app.use('/announcements', announcementsRouter)
app.use('/students', studentsRouter);
app.use('/uploads', uploadsRouter)


app.get('/', (req, res)=>{
    res.json({message: 'server is running...'})
}).listen(5000, ()=> console.log("server is running http://localhost:5000"))
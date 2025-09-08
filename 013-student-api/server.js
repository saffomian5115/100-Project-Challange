const express = require('express');
const db = require('./db');
const announcementsRoutes = require('./routes/announcements')
const studentsRoutes = require('./routes/students')

const app = express();
const port = 5000;

// middle ware 
app.use(express.json());
app.use('/students', studentsRoutes)
app.use('/annoucements', announcementsRoutes)

// test route
app.get('/', (req, res) => {
    res.send('Student api is running.')
}).listen(port, ()=> console.log(`app is running on http://localhost:${port}`)
);


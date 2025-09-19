const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'collegeChatbot'
});

db.connect((err) =>{
    if(err) return console.error({err});
    console.log("connection successful.");
});

module.exports = db;
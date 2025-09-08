const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'student_portal'
});

db.connect((err) => {
    if(err) console.log('connect is fail: ', err);
    else {
        console.log('connention is successful.');   
    } 
});

module.exports = db;
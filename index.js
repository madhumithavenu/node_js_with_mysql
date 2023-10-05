const mysql = require('mysql');
const express = require('express');

let app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "nodemysql"
});

db.connect(err => {
    if (err) console.log("There is an error while connecting" + err);
    app.listen(4000);

    console.log("DB Connected" + db.threadId);
    console.log("Server started at port 4000");

})


app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, err => {
        if(err){
            return err;
        }
        res.send('database created');
    })
})
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id INT AUTO_INCREMENT, name VARCHAR(50), designation VARCHAR(50), PRIMARY KEY(id))';
    db.query(sql, err => {
        if (err) {
            return err;
        }
        res.send('Employee Table created');
    })
})

app.get('/employee1', (req, res) => {
    let post = {
        name: 'Bhoomi',
        designation: 'Developer',
    }
    let sql = 'INSERT INTO employee SET ?';
    let query = db.query(sql, post, err => {
        if (err) {
            return err;
        }
        res.send('Employee Added');
    })
})

app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * FROM employee';
    db.query(sql, (err, result) => {
        if (err) {
            return err;
        }
        console.log(result);
        res.send('Employee details fetched');
    })
})

app.get('/updateemployee/:id', (req, res) => {
    let newName = 'Updated name';
    let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
    db.query(sql, err => {
        if (err) {
            return err;
        }
        res.send('Employee details updated');
    })
})
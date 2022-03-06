const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

const sqlInsert = `INSERT INTO people(name) VALUES('Eduardo')`;
const sqlSelect = `SELECT id, name FROM people`;
let list = '';
connection.query(sqlInsert);
connection.query(sqlSelect, (err, result, fields) => {
    if(err){
        throw err;
    };

    for(let people of result) {
        list += `<li>${people.name}</li>`;
        console.log(people);
    }  
});
connection.end();

app.get('/', (req, res) => {
    res.send(`<h1>Full Cycle Rocks!</h1><br><ul>${list}</ul`)
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
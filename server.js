const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simple_crud'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.get('/items', (req, res) => {
    connection.query('SELECT * FROM items', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    connection.query('INSERT INTO items (name) VALUES (?)', [newItem], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.redirect('/');
    });
});

app.post('/items/delete', (req, res) => {
    const itemId = req.body.id;
    connection.query('DELETE FROM items WHERE id = ?', [itemId], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

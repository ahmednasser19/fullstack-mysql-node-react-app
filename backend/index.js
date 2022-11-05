import express from 'express';
import mysql from "mysql2"
import cors from 'cors'
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "test",
    insecureAuth: true
})
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello world");
})
app.get('/books', (req, res) => {
    const query = "SELECT * FROM books"
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        }
        return res.json(result);
    })
})

app.post('/books', (req, res) => {

    const query = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]
    db.query(query, [values], (err, result) => {
        if (err) {
            console.log(err)
            return res.json(err);
        }
        return res.json(result);
    })
})


app.delete('/books/:id', (req, res) => {

    const bookID = req.params.id
    const query = "DELETE FROM books WHERE id = ? "
    db.query(query, [bookID], (err, result) => {
        if (err) {
            console.log(err)
            return res.json(err);
        }
        return res.json('book has been deleted');
    })
})


app.put('/books/:id', (req, res) => {

    const bookID = req.params.id
    const query = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

    db.query(query, [...values, bookID], (err, result) => {
        if (err) {
            console.log(err)
            return res.json(err);
        }
        return res.json('book has been updated');
    })
})


app.listen(8080, () => {
    console.log("Server is running on port 8080");
})
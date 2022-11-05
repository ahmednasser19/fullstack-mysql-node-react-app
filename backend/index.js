import express from 'express';
import mysql from "mysql2"
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    insecureAuth: true
})
app.use(express.json())
// var corsOptions = {
//     origin: process.env.CLIENT_ORIGIN || "http://localhost:8080"
// };

app.use(cors());
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

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
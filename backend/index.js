import express from 'express';
import mysql from "mysql2"
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "test",
    insecureAuth: true
})
app.use(express.json())


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

    const query = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)"
    const values = [req.body.title, req.body.desc, req.body.cover]
    db.query(query, [values], (err, result) => {
        if (err) {
            console.log(err)
            return res.json(err);
        }
        return res.json(result);
    })
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})
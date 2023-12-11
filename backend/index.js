import express, { json } from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "test",
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});

app.get("/books", (req, res) => {
  const queryBooks = "SELECT * FROM books";
  db.query(queryBooks, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/books", (req, res) => {
  const query = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
  // const values = [req.body.title, req.body.desc, req.body.cover]
  // const values = ["ki thuat lap trinh", "mon nay kho", "con ech"];
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
  ]

  db.query(query, [values], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json("success");
    }
  });
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});

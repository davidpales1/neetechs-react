
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

var corsOptions = {
  origin: "http://localhost:3002"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to neetechs application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on port ${PORT}.`);
});

const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
module.exports = {
  authJwt,
  verifySignUp
};

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "jihad",
  host: "localhost:3306",
  password: "Jihad1996",
  database: "neetechs_react",
})

const saltRounds = 10;

app.post("/create", (req, res) => {
  //const { email, password } = req.body;

  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO users (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        //res.status(500).send("Error registering new user please try again.");
        // tslint:disable-next-line:no-console
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.post("/auth/register", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
  
    db.query(
      "INSERT INTO users (name, age, country, position, wage) VALUES (?,?,?,?,?)",
      [name, age, country, position, wage],
      (err, result) => {
        if (err) {
          // tslint:disable-next-line:no-console
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
app.get("/auth/login", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/auth/me", (req, res) => {
    const token = req.headers["x-access-token"]
    if (!token){
        res.send("Yo, we need a token")
    }
    else{
        jwt.verify(token,"jwtSecret",(err,decode)=>{
            if (err){
                res.json({auth:false,message:"u failed to authenticate "})
            }else{
                req.userId = decode.id;
                next();
            }
        })
    }
    //res.send({"token":"sdfdsfdsfs"});
    /*

    db.query("SELECT * FROM users", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
    */
  });

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
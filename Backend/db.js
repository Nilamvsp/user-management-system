require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("MySQL Connected");

    connection.query("TRUNCATE TABLE users", (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("users table created")
    })
});

module.exports = connection;
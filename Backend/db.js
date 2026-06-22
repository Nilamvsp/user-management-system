const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "userdb",
    port: 3307
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
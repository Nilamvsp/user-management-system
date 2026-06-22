const express = require("express");
const app = express();
const port = 8000;

const connection = require("./db");
var cors = require('cors')
app.use(cors())

app.use(express.json());
//get all users
app.get("/users", (req, res) => {
    let sql = "select * from users"
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                msg: "Database error"
            })
        }

        res.json(result);


    });

})

// Insert single user at once
app.post("/users", (req, res) => {
    const { name, email, age, city } = req.body;
    if (!name || !email || !age || !city) {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }

    let sql = "INSERT INTO users (name,email,age,city) values (?,?,?,?)"

    connection.query(sql,
        [name, email, age, city],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    msg: "Database error"
                });
            }
            res.status(201).json({
                msg: "New user created",
                userId: result.insertId
            });

        });
})

// Insert multiple users at once
app.post("/users/bulk", (req, res) => {

    const newUsers = req.body;

    if (!Array.isArray(newUsers)) {
        return res.status(400).json({
            msg: "Please send an array of users"
        });
    }

    const values = newUsers.map(user => [
        user.name,
        user.email,
        user.age,
        user.city
    ]);

    const sql =
        "INSERT INTO users(name,email,age,city) VALUES ?";

    connection.query(
        sql,
        [values],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    msg: "Database error"
                });
            }

            res.status(201).json({
                msg: "New user created",
                insertedCount: result.affectedRows
            });

        }
    );

});

//get single user by id

app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    let sql = `SELECT * FROM USERS WHERE id = ? `;

    connection.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                msg: "Database error"
            })
        }

        if (result.length === 0) {
            return res.status(404).json({
                msg: "user not found"
            })
        }
        res.json(result[0])
    })


})

//update user PATCH

app.patch("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const updates = [];
    const values = []; 
    
    const allowedFields =
        ["name", "email", "age", "city"];

    for (const key in req.body) {

        if (allowedFields.includes(key)) {
            updates.push(`${key}=?`);
            values.push(req.body[key]);
        }

    }

    if (updates.length === 0) {
        return res.status(400).json({
            msg: "No fields provided"
        });
    }

    const sql =
        `UPDATE users SET ${updates.join(", ")} WHERE id=?`;

    values.push(id);

    connection.query(
        sql,
        values,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    msg: "Database error"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    msg: "User not found"
                });
            }

            res.json({
                msg: "User updated successfully"
            });

        }
    );

});

// update user PUT
app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, age, email, city } = req.body;
    if (!name || !age || !email || !city) {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }

    const sql = "UPDATE users SET name=?, age=?, email=?, city=? where id=? "

    connection.query(sql,
        [name, age, email, city, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    msg: "Database error"
                })

            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    msg: "user not found"
                })
            }
            res.json({
                msg: "user updated successfully"
            })

        }
    )

});

// delete user
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = "DELETE FROM users WHERE id = ?";

    connection.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                msg: "Database error"
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                msg: "user not found"
            })
        }

        res.json({
            msg: "user deleted"
        })
    });


});


app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});



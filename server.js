const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db_access = require('./db.JS')
const db = db_access.db
const cookieParser = require('cookie-parser');
const server = express()
const port = 555
const secret_key = 'DdsdsdKKFDDFDdvfddvxvc4dsdvdsvdb'
server.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
server.use(express.json())
server.use(cookieParser())
const generateToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, secret_key, { expiresIn: '1h' })
}
const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken
    if (!token)
        return res.status(401).send('unauthorized')
    jwt.verify(token, secret_key, (err, details) => {
        if (err)
            return res.status(403).send('invalid or expired token')
        req.userDetails = details

        next()
    })
}
server.post('/user/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    db.get(`SELECT * FROM USER WHERE EMAIL=?  `, [email], (err, row) => {
        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) {
                return res.status(500).send('error comparing password.')
            }
            if (!isMatch) {
                return res.status(401).send('invalid credentials')
            }
            else {
                let userID = row.ID
                let isAdmin = row.ISADMIN
                const token = generateToken(userID, isAdmin)

                res.cookie('authToken', token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure:true,
                    expiresIn: '1h'
                })
                console.log(res.cookie);
                return res.status(200).json({ id: userID, admin: isAdmin, token })
            }
        })
    })
})

server.post(`/user/register`, (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const isAdmin = req.body.isAdmin
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('error hashing password')
        }
        db.run(`INSERT INTO USER (name,email,password,isadmin) VALUES (?,?,?,?)`, [name, email, hashedPassword, isAdmin], (err) => {
            if (err) {

                return res.status(401).send(err)
            }
            else
                return res.status(200).send(`registration successfull`)
        })
    })
})

server.post('/user/logout', (req, res) => {
    res.cookie('authToken', '', {
        httpOnly: true,
        sameSite: 'none',
        secure:true,
        expiresIn: '1h'
    })
    return res.status(200).json({ message: "Logged out successfully" })
})

server.post(`/rents/addrent`, (req, res) => {
    // const isAdmin = req.userDetails.isAdmin;
    // if (isAdmin !== 1)
    //     return res.status(403).send("you are not an admin")
    const type = req.body.type
    const model = req.body.model
    const quantity = parseInt(req.body.quantity, 10)
    let query = `INSERT INTO RENT (TYPE,MODEL,QUANTITY) VALUES
    (?,?,?)`
    db.run(query, [type, model, quantity], (err) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(`Rent added successfully`)
        }
    })

})

server.delete(`/rents/deleterent`, (req, res) => {
    // const isAdmin = req.userDetails.isAdmin;
    // if (isAdmin !== 1)
    //     return res.status(403).send("you are not an admin")
    const type = req.body.type
    const model = req.body.model
    
    const rentID = req.body.rentID
    let query = `DELETE FROM RENT WHERE ID=? AND TYPE=? AND MODEL=?`

    console.log(query);
    db.run(query, [rentID, type, model], (err) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(`Rent deleted successfully`)
        }
    })

})

server.get(`/rents`, (req, res) => {
    // const isAdmin = req.userDetails.isAdmin;
    // if (isAdmin !== 1)
    //     return res.status(403).send("you are not an admin")
    const query = `SELECT * FROM RENT`
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.json(rows)
        }
    })
})

server.get(`/userrents/:id`, (req, res) => {
    // const query = `SELECT * FROM BOOKING WHERE USER_ID=${req.params.id}`
    const query = `SELECT 
    BOOKING.*, 
    RENT.*
FROM 
    BOOKING
RIGHT JOIN 
    RENT ON BOOKING.RENT_ID = RENT.ID
WHERE 
    BOOKING.USER_ID = ${req.params.id}`

    db.all(query, (err, row) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else if (!row)
            return res.send(`rent with id ${req.params.id} not found`)
        else
            return res.send(row)
    })
})

server.put(`/rents/edit`, (req, res) => {
    let rentID = req.body.rentID
    let quantity = req.body.quantity;
    quantity = parseInt(quantity, 10);

    query = `UPDATE RENT SET QUANTITY=${quantity} WHERE ID=${rentID}`
    console.log(query)
    db.run(query, (err) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else
            res.send(`Rent updated successfully`)
    })
})

server.put(`/book`, (req, res) => {
    let type = req.query.type
    let model = req.query.model
    let query = `SELECT * FROM RENT WHERE TYPE='${type}'
    AND MODEL='${model}'`

    db.get(query, (err, row) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {

            let rentID = req.body.rentID
            let userID = req.body.userID
            let quantity = req.body.quantity
            let query2 = `INSERT INTO BOOKING (USER_ID,RENT_ID) VALUES (${parseInt(userID, 10)},${rentID})`
            console.log(query2)
            db.run(query2, (err) => {
                if (err) {
                    console.log(err)
                    return res.send(err)
                }
                else {

                    quantity = parseInt(quantity, 10)
                    quantity = quantity - 1
                    query = `UPDATE RENT SET QUANTITY=${quantity} WHERE ID=${rentID}`
                    console.log(query)
                    db.run(query, (err) => {
                        if (err) {
                            console.log(err)
                            return res.send(err)
                        }
                        else
                            res.send(`booked successfully`)
                    })
                }

            })
        }
    }
    )
})

// Fetch all users (Admin only)
server.get('/users', (req, res) => {
    // const isAdmin = req.userDetails.isAdmin; // Extract admin status from token
    // if (!isAdmin) {
    //     return res.status(403).send('Access denied. Admins only.');
    // }

    const query = `SELECT * FROM USER`
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.json(rows)
        }
    })
});

server.delete(`/users/deleteuser`, (req, res) => {
    const userID = req.body.id
    let query = `DELETE FROM USER WHERE ID=?`

    db.run(query, [userID], (err) => {
        if (err) {
            console.log(err)
            return res.send(err)
        }
        else {
            return res.send(`User deleted successfully`)
        }
    })

});

server.listen(port, () => {
    console.log(`server started at port ${port}`)
    db.serialize(() => {
        db.run(db_access.createUserTable, (err) => {
            if (err)
                console.log("error creating user table " + err)
        });
        db.run(db_access.createRentTable, (err) => {
            if (err)
                console.log("error creating rent table " + err)
        });
        db.run(db_access.createBookingTable, (err) => {
            if (err)
                console.log("error creating booking table " + err)
        });
    })



})

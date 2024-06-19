import express, { response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const salt = 10;

const app = express();
// app.use((req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173/");
//     // res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//     // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   })

app.use(express.json());
app.use(cors({
    // origin: ['http://54.227.1.200/'],
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(cors({
    // origin: ['http://54.227.1.200/'],
    origin: ['https://na.account.amazon.com'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(cookieParser());
  

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lwa-poc'
})

// const db = mysql.createConnection({
//     host: 'sql12.freesqldatabase.com',
//     user: 'sql12714391',
//     password: 'QCJ6tn4Rrp',
//     database: 'sql12714391'
// })

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({ Error: 'Token missing' });
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if(err) {
                return res.json({ Error: 'Token Error' });
            } else {
                req.email = decoded.email;
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({Status: "success", email: req.email});
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`firstName`, `lastName`, `email`, `password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json(err);
        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            // req.body.password,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if(err) return res.json(err);
            return res.json({Status: "success"});
        })
    })
    
})
// abc@xyz.com
app.post('/login', (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    const sql = "SELECT * FROM login WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json(err);
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, passwordRes) => {
                if (passwordRes) {
                    const email = result[0].email;
                    const token = jwt.sign({email}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "success"});
                } else {
                    return res.json(err);
                }
            });
        } else {
            return res.json(err);
        }
    })
    
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "success"});
})

app.listen(8001, () => {
    console.log('listening on 3306...');
})
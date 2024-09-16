const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jscbshcshssdsuegfezefbekwr3zzz23'

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('Test Ok')
});

// MongoDB_password: jnEEsPU4O4AXIaM0

app.post('/register', async (req, res) => {

    const {name, email, password} = req.body;

    try {
        const user = await User.create({
            name,
            email,
            // yarn add bcryptjs
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(user);
        
    } catch (error) {
        console.log(error);
    }
});


app.post('/login', async (req, res) => {
    const {email, password} = req.body;

   const user = await User.findOne({email})

   if(user) {
        const passOK = bcrypt.compareSync(password, user.password);
        if(passOK) {
            // yarn add jsonwebtoken
            jwt.sign({
                email: user.email,
                id: user._id
            }, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user);
            })
        }
        else res.json('Password not Ok')
    }
   else res.json('Not found')

})


app.get('/profile', (req, res) => {

    // yarn add cookie-parser
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, result) => {
            if(err) throw err;
            const {name,email,_id} = await User.findOne(result._id)
            res.json({name,email,_id});
        });
    } else    res.json(null);
})


app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Logged out succesful')
})
// Port for listening on api request
app.listen(4000)
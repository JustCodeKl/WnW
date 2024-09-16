const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const bcrypt = require('bcryptjs');
require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('Test Ok')
})

// MongoDB_password: jnEEsPU4O4AXIaM0

app.post('/register', async (req, res) => {

    const {name, email, password} = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(user);
        
    } catch (error) {
        console.log(error);
    }
})

// Port for listening on api request
app.listen(4000)
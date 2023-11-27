const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

const generateToken = (data) => {
    const token = jwt.sign(data, process.env.PRIVATE_KEY)
    return token
}

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.json({ status: 200 });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: error._message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken({ userId: user._id })
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/users', async (_, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;

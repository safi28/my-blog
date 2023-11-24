require('dotenv').config();

const express = require('express');

const authRoute = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const dbConnector = require("./config/db")

const app = express();

dbConnector()
    .then(() => {
        console.log('Database Connected');
        require("./config/express")(app);

        app.use("/auth", authRoute);
        app.use('/posts', postRouter);
        app.use('/users', userRouter);

        app.listen(
            process.env.PORT || 5050,
            console.log(`Port *${process.env.PORT}* is ready!`));
    })
    .catch(console.error);

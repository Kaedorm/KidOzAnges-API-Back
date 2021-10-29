require("dotenv").config();
const express = require("express");
const router = require("./app/router");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: null
}));
app.use(router);

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});


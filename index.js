require("dotenv").config();
const express = require("express");
const router = require("./app/router");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({origin:"https://kidozanges.netlify.app"}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(router);

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});


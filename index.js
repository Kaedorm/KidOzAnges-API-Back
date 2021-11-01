require("dotenv").config();
const express = require("express");
const router = require("./app/router");
const cors = require("cors");
const path = require("path")
const jwt = require("jsonwebtoken");
const session = require("express-session");

const { uploadFile} = require("./s3")


const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: "http://localhost:3000",
  credentials:true,
  allowedHeaders: ["authorization", "Content-Type"],
  
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});


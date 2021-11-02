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

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
  origin: ["https://kidozanges.netlify.app", "http://localhost:3000"],
  credentials:true,
  allowedHeaders: ["authorization", "Content-Type"]
}));

app.use(router);

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});


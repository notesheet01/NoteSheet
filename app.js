const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = process.env.PORT || 8080;
const mysql = require("mysql2");
const { deprecate } = require("util");
let Faculty;

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Yuvi@108',
    database : 'first'
});
async function DB(){
    await connection.connect();
}
DB()
.then(()=>{
    console.log("Connection Estabilshed");
})
.catch((err)=>{
    console.log("Error is", err);
});
let data = async function (){
        // await connection.execute(`Select * from Employee`, (err,result,fields)=>{
        // console.log(result);
        // console.log(fields);

    //}
    //);
    console.log("Hello DB");
}

data()
.then(()=>{
    console.log("Query Executed");
})
.catch((error)=>{
    console.log(error);
})



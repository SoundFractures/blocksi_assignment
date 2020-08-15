const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.get('/',(req,res) =>{
    res.send("Hello 123");
})


app.listen(5000)




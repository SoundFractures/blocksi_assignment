const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
app.use(express.json());

const contacts = require('./routes/api/contacts_api');


//const db = require('./config/config').dbConnection;
mongoose.connect(process.env.db, {
    useNewUrlParser: true
}).then(() => console.log("Mongo DB | Connected")).catch(error => console.log(error));

const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send("Hello db");
})

app.use('/api/contacts', contacts);


app.listen(port)
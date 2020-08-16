const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
app.use(express.json());


mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    userCreateIndex: true
}).then(() => console.log("Mongo DB | Connected")).catch(error => console.log(error));

const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send("Hello db");
})

app.use('/api/contacts', require('./routes/api/contacts_api'));
app.use('/api/auth', require('./routes/api/auth_api'));


app.listen(port)
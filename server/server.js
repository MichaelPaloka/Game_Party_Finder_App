require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require ('cookie-parser')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/gamePost.routes')(app);
app.use(cookieParser())

app.listen(process.env.MY_PORT, () => {
    console.log("Listening at Port 8000")
})
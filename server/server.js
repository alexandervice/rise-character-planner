const express = require('express');
const cors = require("cors");
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require('dotenv').config();
require("./config/mongoose.config");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));

require("./routes/user.routes")(app);
require("./routes/character.routes")(app);
require("./routes/documentation.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );
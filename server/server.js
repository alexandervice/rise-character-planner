const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000; // Allow the port to be set dynamically by the hosting environment
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';

require('dotenv').config();
require("./config/mongoose.config");

app.use(cookieParser());
app.use(cors({credentials: true, origin}));
app.use(express.json(), express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/images", express.static("images"));

require("./routes/user.routes")(app);
require("./routes/character.routes")(app);
require("./routes/documentation.routes")(app);
require("./routes/openAi.routes")(app);


app.listen(port, () => console.log(`Listening on port: ${port}`) );
const express = require('express');
const cors = require("cors");
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

require('dotenv').config();
require("./config/mongoose.config");

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/images", express.static("images"));

require("./routes/user.routes")(app);
require("./routes/character.routes")(app);
require("./routes/documentation.routes")(app);


// app.use((err, req, res, next) => {
//   if (err.name === 'ValidationError') {
//       res.status(400).json({ errors: err.errors });
//   } else {
//       console.log(err);
//       res.status(500).json({ message: "An unexpected error occurred. Please try again." });
//   }
// });

// app.use((req, res, next) => {
//   res.status(404).json({ message: "Route not found" });
// });

app.listen(port, () => console.log(`Listening on port: ${port}`) );
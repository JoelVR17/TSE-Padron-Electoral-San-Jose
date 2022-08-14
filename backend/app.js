const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const app = express();

require("dotenv/config");

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache");
  next();
});
app.set("etag", false);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());

//IMPORT ROUTES

const padronRoute = require("./routes/padron");
const distelecRoute = require("./routes/distelec");
const loginRoute = require("./routes/login.js");

app.use("/padron", padronRoute);
app.use("/login", loginRoute);

app.use("/distelec", distelecRoute);

//Routes can be created:
app.get("/", (req, res) => {
  res.send("We are on Home");
});

app.listen(3000);
console.log("listening on http://localhost:3000");

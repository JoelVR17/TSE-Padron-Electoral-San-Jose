const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv/config");

// //Middlewares

// app.use('/posts',()=>{
//     console.log('this is a middleware working.');
// })

app.use(cors());
app.use(express.json());

//IMPORT ROUTES

const padronRoute = require("./routes/padron");
const distelecRoute = require("./routes/distelec");

app.use("/padron", padronRoute);

app.use("/distelec", distelecRoute);

//Routes can be created:
app.get("/", (req, res) => {
  res.send("We are on Home");
});

app.listen(3000);
console.log("listening on http://localhost:3000");

const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

var config = require("../config");

router.post("/", async (req, res) => {
  let conn;
  try {
    config.user = req.body.user;
    config.password = req.body.password;
    console.log("Starting to establish a connection. . . . . ");
    conn = await oracledb.getConnection(config);
    res.json({
      message: "Connection Succesfull",
    });

    conn.close();
  } catch (err) {
    res.json({
      message: err.message,
    });
    return;
  }
});

router.get("/logout", async (req, res) => {
  res.json({
    message: "Connection Closed",
  });
  global.user = "";
  global.password = "";
});

module.exports = router;

const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const lineReader = require("line-reader");
const fs = require("fs");
const eol = require("eol");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("padron");
// const Post = require('../models/Post');
const config = {
  user: "TSE",
  password: "tse123",
  connectString: "localhost:1521/oracle",
};
//GET ALL
router.get("/", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(config);
    const padron = await conn.execute("select * from padron fetch next 50000 rows only");
     //const padron = await conn.execute("select * from padron");
    res.json(padron.rows);
  } catch (err) {
    res.json({
      message: err,
    });
  } finally {
    if (conn) {
      await conn.close();
    }
  }
});
let padron = [];
router.get("/insert", async (req, res) => {
  try {
    lineReader.eachLine("./uploads/SJ.txt", function (line, last) {
      const regex = /\x20{2,}/g;
      let result = line.replace(regex, ``);
      result = result.replace('�','Ñ');
      let array = result.split(",");
      let elector = {
        a: array[0].toString(),
        b: array[1].toString(),
        c: array[3].toString(),
        d: array[5].toString(),
        e: array[6].toString(),
        f: array[7].toString(),
      };

      padron.push(elector);

      if (last) {
        insertPadron();

        res.json("FINISHED SANITIZED");
      }
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//GET SPECIFIC Employee
// router.get("/:employeeID", async (req, res) => {
//   let conn;
//   try {
//     conn = await oracledb.getConnection(config);
//     const employee = await conn.execute(
//       "select * from employees where employee_id = :employeeID",
//       [req.params.employeeID]
//     );
//     res.json(employee.rows);
//   } catch (err) {
//     res.json({
//       message: err,
//     });
//   } finally {
//     if (conn) {
//       await conn.close();
//     }
//   }
// });

router.post("/", upload, async (req, res) => {
  try {
    fs.existsSync("./uploads/SJ.txt");
    res.json("Padron de San Jose Subido correctamente.");
  } catch (err) {
    res.json({
      message: err,
    });
  } finally {
  }
});

async function insertPadron() {
  deletePadron();
  const conn = await oracledb.getConnection(config);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  const time = process.uptime();
  try {
    const sql = "INSERT INTO PADRON VALUES (:a,:b,:c,:d,:e,:f)";
    let result = await conn.executeMany(sql, padron, { autoCommit: true });
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB \n` +
        `The script uses approximately ${time} s`
    );
    if (conn) conn.close();
  }
}

async function deletePadron(){
  const conn = await oracledb.getConnection(config);
  try {
    console.log("LEGAMOS");
     conn.execute("DELETE padron");  
     conn.commit();
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
     conn.close();
    }
  }
}

module.exports = router;

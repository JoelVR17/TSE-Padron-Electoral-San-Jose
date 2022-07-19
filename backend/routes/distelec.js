const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
const lineReader = require("line-reader");
const fs = require("fs");
const eol = require("eol");

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
    const distelec = await conn.execute(
      "select * from distelec fetch next 2100 rows only"
    );
    // const distelec = await conn.execute("select * from distelec");
    res.json(distelec.rows);
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
let distelec = [];
router.get("/insert", async (req, res) => {
  distelec = [];
  try {
    lineReader.eachLine("./uploads/distelec.txt", function (line, last) {
      const regex = /\x20{2,}/g;
      let result = line.replace(regex, ``);
      result = result.replace("�", "Ñ");
      let array = result.split(",");
      let elector = {
        a: array[0].toString(),
        b: array[1].toString(),
        c: array[2].toString(),
        d: array[3].toString(),
      };

      distelec.push(elector);

      if (last) {
        insertDistelec();

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

router.post("/upload-distelec", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;
      file.mv("./uploads/" + file.name);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

async function insertDistelec() {
  deleteDistelec();
  const conn = await oracledb.getConnection(config);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  const time = process.uptime();
  try {
    const sql = "INSERT INTO distelec VALUES (:a,:b,:c,:d)";
    let result = await conn.executeMany(sql, distelec, { autoCommit: true });
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

async function deleteDistelec() {
  const conn = await oracledb.getConnection(config);
  try {
    console.log("Eliminando registros previos");
    conn.execute("DELETE distelec");
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

const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");
oracledb.autoCommit = true;
const lineReader = require("line-reader");

// const Post = require('../models/Post');
var config = require("../config");

//GET ALL
router.get("/", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(config);
    const padron = await conn.execute(
      "select * from padron fetch next 40000 rows only"
    );
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
//GET 5 NOMBRES MAS COMUNES
router.get("/top5nombresmascomunes", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(config);
    const consulta = await conn.execute(`SELECT * FROM top5nombresmascomunes`);

    res.json(consulta.rows);
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
//GET 5 NOMBRES MENOS COMUNES
router.get("/top5nombresmenoscomunes", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(config);

    const consulta = await conn.execute(
      `SELECT * FROM top5nombresmenoscomunes`
    );

    res.json(consulta.rows);
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

//GET 5 CANTONES CON MAS ELECTORES
router.get("/top5cantones", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(config);
    const consulta = await conn.execute(`SELECT * FROM top5cantones`);
    res.json(consulta.rows);
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

//GET NOMBRES CON LAS 5 VOCALES
router.get("/consultavocales", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(config);
    const consulta = await conn.execute(`SELECT * FROM consultavocales`);

    res.json(consulta.rows);
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

router.get("/", async (req, res) => {
  let conn;
  try {
    conn = await oracledb.getConnection(config);
    const padron = await conn.execute(
      "select * from padron fetch next 40000 rows only"
    );
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
  padron = [];
  try {
    lineReader.eachLine("./uploads/SJ.txt", function (line, last) {
      const regex = /\x20{2,}/g;
      let result = line.replace(regex, ``);
      result = result.replace("�", "Ñ");
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

router.post("/upload-padron", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let file = req.files.file;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
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

async function insertPadron() {
  deletePadron();
  const conn = await oracledb.getConnection(config);
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  const time = process.uptime();
  try {
    const sql = `BEGIN
    AgregarElector(:a,:b,:c,:d,:e,:f); 
    END;`;
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

async function deletePadron() {
  const conn = await oracledb.getConnection(config);
  try {
    console.log("Eliminando registros previos");
    conn.execute("DELETE padron COMMIT");
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

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { testPG, getInactiveNodes, getActiveNodes } = require("./pg");
const fs = require("fs");
const md5 = require("md5-file");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/pg-test", async (req, res) => {
  const pgtest = await testPG();
  res.send(pgtest);
});
app.get("/inactive-nodes", async (req, res) => {
  const inactiveNodes = await getInactiveNodes();
  res.send(inactiveNodes);
});
app.get("/active-nodes", async (req, res) => {
  const activeNodes = await getActiveNodes();
  res.send(activeNodes);
});

app.get("/firmware-update", function (req, res, next) {
  //console.log(req.headers);
  let filePath = path.join(__dirname, "/firmwares/ota-test.bin");

  //console.log(filePath)
  let options = {
    // root:filePath,
    headers: {
      "x-MD5": md5.sync(filePath),
    },
  };
  res.sendFile(filexPath, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", filePath);
    }
  });
});

app.get("/firmware-update/checksum", (req, res) => {
  let filePath = path.join(__dirname, "/firmwares/checksum.txt");
  // if (!fs.existsSync(filePath)) {
  //   console.log("Checksum file does not exist");
  //   res.send("null");
  // }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log("Checksum file does not exist");
      res.send("Checksum file does not exists");
      return;
    }

    try {
      const data = fs.readFileSync(filePath, "utf8");
      console.log(data);
      res.send(data);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

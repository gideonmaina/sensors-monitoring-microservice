const express = require("express");
const app = express();
const port = 3000;
const path = require('path')
const { testPG, getInactiveNodes, getActiveNodes } = require("./pg");
const fs = require('fs')
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



app.get('/firmware-update', function(req, res, next) {
 //console.log(req.headers);
let filePath = path.join(__dirname, '/firmwares/ota-test.bin');

 //console.log(filePath)
 let options = {
  // root:filePath,
  headers: {
   "x-MD5":  md5.sync(filePath)
  }
 }
 res.sendFile(filePath, options, function (err) {
  if (err) {
   next(err)
  } else {
   console.log('Sent:', filePath)
  }
 });
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const app = express();
const port = 3000;
const { testPG } = require("./pg");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/pg-test", async (req, res) => {
  const pgtest = await testPG();
  res.send(pgtest);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const app = express();
const port = 3000;
const { testPG, getInactiveNodes, getActiveNodes } = require("./pg");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

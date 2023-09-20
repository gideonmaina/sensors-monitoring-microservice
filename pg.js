require("dotenv").config();
const fs = require("fs");
const { Client } = require("pg");

async function testPG() {
  //   const client = new Client();
  const client = new Client(process.env.POSTGRES_URL);
  await client.connect();
  const res = await client.query("SELECT $1::text as message", [
    "Postgres is available",
  ]);

  await client.end();
  return res.rows[0].message;
}

async function getInactiveNodes() {
  const client = new Client(process.env.POSTGRES_URL);
  const file = fs.readFileSync("./InactiveNodes_Script2.sql", "utf8");
  await client.connect();
  const res = await client.query(file);

  await client.end();
  return res.rows;
}

async function getActiveNodes() {
  const client = new Client(process.env.POSTGRES_URL);
  const file = fs.readFileSync("./ActiveNodes_Script1.sql", "utf8");
  await client.connect();
  const res = await client.query(file);

  await client.end();
  return res.rows;
}

module.exports = { testPG, getInactiveNodes, getActiveNodes };

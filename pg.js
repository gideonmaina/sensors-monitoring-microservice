require("dotenv").config();
const { Client } = require("pg");
const client = new Client(process.env.POSTGRES_URL);

async function testPG() {
  //   const client = new Client();
  await client.connect();
  const res = await client.query("SELECT $1::text as message", [
    "Postgres is available",
  ]);

  await client.end();
  return res.rows[0].message;
}

async function getInactiveNodes() {
  //   const client = new Client();
  const fs = require("fs");
  const file = fs.readFileSync("./inactiveNodes_Script2.sql", "utf8");
  await client.connect();
  const res = await client.query(file);

  await client.end();
  return res.rows;
}

module.exports = { testPG, getInactiveNodes };

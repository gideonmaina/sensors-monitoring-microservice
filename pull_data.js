const { getInactiveNodes, getActiveNodes } = require("./pg");
const fs = require("fs");
const cron = require("node-cron");
const pull_and_save = async () => {
  fs.writeFile(
    "data/active_nodes.json",
    JSON.stringify(await getActiveNodes()),
    { flag: "w+" },
    (err) => {
      if (err) console.log(err);
    }
  );

  fs.writeFile(
    "data/inactive_nodes.json",
    JSON.stringify(await getInactiveNodes()),
    { flag: "w+" },
    (err) => {
      if (err) console.log(err);
    }
  );
};

// call function(s) every 10 minutes
cron.schedule("*/10 * * * *", function () {
  pull_and_save();
});

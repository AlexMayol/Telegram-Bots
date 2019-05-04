require("dotenv").config();

module.exports = {
  botToken: process.env.BOT_TOKEN,
  ownersID: [process.env.OWNER_ID_1, process.env.OWNER_ID_2]
};


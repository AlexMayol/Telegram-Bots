require("dotenv").config();

module.exports = {
  botToken: process.env.BOT_TOKEN,
  mongoURI: process.env.MONGO_URI,
  mongoDatabaseName: process.env.MONGO_DATABASE_NAME,
  ownersID: [process.env.OWNER_ID_1, process.env.OWNER_ID_2]
};


const database = require("../database");
const Baits = require("./Texts/mood");
const services = {};

services.addAudio = ({ id }, callback) => {
  const inputData = { id, type: "audio" };
  database.collection("audios").insertOne(inputData, callback);
};

services.audio = callback =>
  database
    .collection("audios")
    .find({})
    .toArray(function(err, result) {
      if (err) return callback(err);
      if (result.length == 0) return callback();

      const audio = result[Math.floor(Math.random() * result.length)];
      callback(null, audio);
    });

services.deleteAllAudios = function(msg, bot, config, MongoClient) {
  if (!config.ownersID.includes(msg.from.id)) {
    bot.sendMessage(msg.chat.id, Baits.pickBait());
    return;
  }
  MongoClient.connect(
    config.mongoURI,
    { useNewUrlParser: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("midnightbot");
      var myquery = {};
      dbo.collection("audios").deleteMany(myquery, function(err, obj) {
        if (err) throw err;
        if (obj.result.n > 0) {
          bot.sendMessage(msg.chat.id, "Todos borrados ❗️");
        } else {
          bot.sendMessage(msg.chat.id, "No había audios que borrar 🤷🏼‍♂️");
        }
        db.close();
      });
    }
  );
};

services.deleteAudio = function(msg, bot, config, MongoClient) {
  if (!config.ownersID.includes(msg.from.id)) {
    bot.sendMessage(msg.chat.id, Baits.pickBait());
    return;
  }
  if (
    msg.reply_to_message != null &&
    msg.reply_to_message.from.first_name == "Midnight Bot"
  ) {
    if (msg.reply_to_message.voice == null) {
      bot.sendMessage(msg.chat.id, "Creo que eso no es un audio...");
      return;
    }
    let deleting = msg.reply_to_message.voice.file_id;
    MongoClient.connect(
      config.mongoURI,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) throw err;
        var dbo = db.db("midnightbot");
        var myquery = { id: deleting };
        dbo.collection("audios").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
          obj.result.n > 0
            ? bot.sendMessage(msg.chat.id, "Borrado 🤦🏻‍♂️")
            : bot.sendMessage(chatId, "No se ha borrado nada 💤");
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "Debes citar un audio para borrarlo.");
  }
};

module.exports = services;

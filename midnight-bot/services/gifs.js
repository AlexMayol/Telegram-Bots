const Baits = require("./borde");
let services = {};

services.addGIF = function(msg, bot, config, MongoClient) {
  if (msg.reply_to_message != null && msg.reply_to_message.animation != null) {
    MongoClient.connect(
      config.mongoURI,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) {
          bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
          throw err;
        }
        var dbo = db.db("midnightbot");
        var myobj = { id: msg.reply_to_message.animation.file_id, type: "gif" };
        dbo.collection("gifs").insertOne(myobj, function(err, res) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
            throw err;
          }
          bot.sendMessage(msg.chat.id, "GIF añadido correctamente.");
          console.log(myobj);
          db.close();
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, Baits.pickBait());
  }
};

services.GIF = function(msg, bot, config, MongoClient) {
  MongoClient.connect(
    config.mongoURI,
    { useNewUrlParser: true },
    function(err, db) {
      if (err) {
        bot.sendMessage(msg.chat.id, "No se ha podido acceder a la lista.");
        throw err;
      }
      var dbo = db.db("midnightbot");
      dbo
        .collection("gifs")
        .find({})
        .toArray(function(err, result) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido acceder a la lista.");
            throw err;
          }
          if (result.length > 0) {
            let gif = result[Math.floor(Math.random() * result.length)];
            bot.sendDocument(msg.chat.id, gif.id);
          } else {
            bot.sendMessage(msg.chat.id, "No hay gifs en la lista.");
          }
          db.close();
        });
    }
  );
};

services.deleteGIF = function(msg, bot, config, MongoClient) {
  if (!config.ownersID.includes(msg.from.id)) {
    bot.sendMessage(msg.chat.id, Baits.pickBait());
    return;
  }
  if (
    msg.reply_to_message != null &&
    msg.reply_to_message.animation != null &&
    msg.reply_to_message.from.first_name == "Midnight Bot"
  ) {
    let deleting = msg.reply_to_message.animation.file_id;
    MongoClient.connect(
      config.mongoURI,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) throw err;
        var dbo = db.db("midnightbot");
        var myquery = { id: deleting };
        dbo.collection("gifs").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
          obj.result.n > 0
            ? bot.sendMessage(msg.chat.id, "Se ha borrado correctamente.")
            : bot.sendMessage(chatId, "No se ha borrado nada.");
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "Debes citar un gif para poder borrarlo.");
  }
};

services.deleteAllGIFs = function(msg, bot, config, MongoClient) {
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
      dbo.collection("gifs").deleteMany(myquery, function(err, obj) {
        if (err) throw err;
        if (obj.result.n > 0) {
          bot.sendMessage(msg.chat.id, "Todos los gifs borrados.");
        } else {
          bot.sendMessage(msg.chat.id, "No había gifs que borrar.");
        }
        db.close();
      });
    }
  );
};

module.exports = services;

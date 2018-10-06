const Baits = require("./Texts/mood");
let services = {};

services.addGIF = function(msg, bot, config, MongoClient) {
  if (msg.reply_to_message != null) {
    if (msg.reply_to_message.animation == null) {
      bot.sendMessage(msg.chat.id, "Me da que eso no es un GIF, eh.");
      return;
    }
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
          bot.sendMessage(msg.chat.id, "GIF añadido 😏");
          console.log(myobj);
          db.close();
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "¿No sabes añadir gifs...?");
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
    msg.reply_to_message.from.first_name == "Midnight Bot"
  ) {
    if (msg.reply_to_message.animation == null) {
      bot.sendMessage(msg.chat.id, "Me parece que eso no es un gif 🙃");
      return;
    }
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
            ? bot.sendMessage(msg.chat.id, "Todo borrado 💁🏻‍♂️")
            : bot.sendMessage(chatId, "No se ha borrado nada.");
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "Que así no se borra un GIF...");
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
          bot.sendMessage(msg.chat.id, "A la mierda todo 🙁");
        } else {
          bot.sendMessage(msg.chat.id, "No había gifs que borrar.");
        }
        db.close();
      });
    }
  );
};

module.exports = services;

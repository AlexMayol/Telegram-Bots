let services = {};

services.addFact = function(msg, bot, config, MongoClient) {
  if (msg.reply_to_message != null && msg.reply_to_message.voice != null) {
    MongoClient.connect(
      config.mongoURI,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) {
          bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
          throw err;
        }
        var dbo = db.db("midnightbot");
        var myobj = { id: msg.reply_to_message.voice.file_id, type: "fact" };
        dbo.collection("facts").insertOne(myobj, function(err, res) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
            throw err;
          }
          bot.sendMessage(msg.chat.id, "Fact añadido correctamente.");
          console.log(myobj);
          db.close();
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "Error al añadir audio");
  }
};

services.fact = function(msg, bot, config, MongoClient) {
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
        .collection("facts")
        .find({})
        .toArray(function(err, result) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido acceder a la lista.");
            throw err;
          }
          if (result.length > 0) {
            var fact = result[Math.floor(Math.random() * result.length)];

            bot.sendVoice(msg.chat.id, String(fact.id));
          } else {
            bot.sendMessage(msg.chat.id, "No hay facts en la lista.");
          }
          db.close();
        });
    }
  );
};

services.deleteAllFacts = function(msg, bot, config, MongoClient) {
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
      dbo.collection("facts").deleteMany(myquery, function(err, obj) {
        if (err) throw err;
        if (obj.result.n > 0) {
          bot.sendMessage(msg.chat.id, "Todos los facts borrados.");
        } else {
          bot.sendMessage(msg.chat.id, "No había facts que borrar.");
        }
        db.close();
      });
    }
  );
};

services.deleteFact = function(msg, bot, config, MongoClient) {
  if (!config.ownersID.includes(msg.from.id)) {
    bot.sendMessage(msg.chat.id, Baits.pickBait());
    return;
  }
  if (
    msg.reply_to_message != null &&
    msg.reply_to_message.voice != null &&
    msg.reply_to_message.from.first_name == "Midnight Bot"
  ) {
    let deleting = msg.reply_to_message.voice.file_id;
    MongoClient.connect(
      config.mongoURI,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) throw err;
        var dbo = db.db("midnightbot");
        var myquery = { id: deleting };
        dbo.collection("facts").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          db.close();
          obj.result.n > 0
            ? bot.sendMessage(msg.chat.id, "Se ha borrado correctamente.")
            : bot.sendMessage(chatId, "No se ha borrado nada.");
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "Debes citar un audio para poder borrarlo.");
  }
};

module.exports = services;

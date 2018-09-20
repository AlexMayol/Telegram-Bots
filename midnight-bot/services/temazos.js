const Baits = require("./borde");
let services = {};

services.addTemazo = function(msg, bot, config, MongoClient) {
  if (msg.reply_to_message != null && msg.reply_to_message.audio != null ) {
    MongoClient.connect(
      config.mongoURI,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) {
          bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
          throw err;
        }
        var dbo = db.db("midnightbot");
        var myobj = { id: msg.reply_to_message.audio.file_id, type: "temazo" };
        dbo.collection("temazos").insertOne(myobj, function(err, res) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
            throw err;
          }
          bot.sendMessage(msg.chat.id, "Temazo añadido correctamente.");
          console.log(myobj);
          db.close();
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "Error al añadir temazo");
  }
};

services.temazo = function(msg, bot, config, MongoClient) {
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
        .collection("temazos")
        .find({})
        .toArray(function(err, result) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido acceder a la lista.");
            throw err;
          }
          if (result.length > 0) {
            var audio = result[Math.floor(Math.random() * result.length)];
            bot.sendAudio(msg.chat.id, audio.id);
          } else {
            bot.sendMessage(msg.chat.id, "No hay temazos en la lista.");
          }
          db.close();
        });
    }
  );
};

services.deleteAllTemazos = function(msg, bot, config, MongoClient){
  if (!config.ownersID.includes(msg.from.id)) {
    bot.sendMessage(msg.chat.id, Baits.pickBait());
    return;
  }
 MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("midnightbot");
    var myquery = { };
    dbo.collection("temazos").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      if(obj.result.n > 0){
        bot.sendMessage(msg.chat.id, "Todos los temazos borrados.");
      }
      else{
        bot.sendMessage(msg.chat.id, "No había temazos que borrar.");
      }
      db.close();
    });
  })
}

services.deleteTemazo = function(msg, bot, config, MongoClient){
  if (!config.ownersID.includes(msg.from.id)) {
    bot.sendMessage(msg.chat.id, Baits.pickBait());
    return;
  }
  if(msg.reply_to_message != null && msg.reply_to_message.audio != null && msg.reply_to_message.from.first_name == "Midnight Bot"){
    let deleting = msg.reply_to_message.audio.file_id;
    MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("midnightbot");
      var myquery = { id: deleting };
      dbo.collection("temazos").deleteOne(myquery, function(err, obj) {
        if (err) throw err;        
        db.close();
        (obj.result.n > 0) ? bot.sendMessage(msg.chat.id, "Se ha borrado correctamente.") : bot.sendMessage(chatId, "No se ha borrado nada.");
      });
    });
  } else{
    bot.sendMessage(msg.chat.id, "Debes citar un temazo para poder borrarlo.");
  }
}

module.exports = services;
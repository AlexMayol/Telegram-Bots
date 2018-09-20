let services = {};


services.addSticker = function(msg, bot, config, MongoClient) {
  if (/*msg.from.id == config.subjectID &&*/ msg.reply_to_message != null && msg.reply_to_message.sticker != null ) {
    MongoClient.connect(
      config.mongoURI,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) {
          bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
          throw err;
        }
        var dbo = db.db("midnightbot");
        var myobj = { id: msg.reply_to_message.sticker.file_id, type: "sticker" };
        dbo.collection("stickers").insertOne(myobj, function(err, res) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
            throw err;
          }
          bot.sendMessage(msg.chat.id, "Sticker añadido correctamente.");
          console.log(myobj);
          db.close();
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "Error al añadir audio");
  }
};

services.sticker = function(msg, bot, config, MongoClient) {
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
        .collection("stickers")
        .find({})
        .toArray(function(err, result) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido acceder a la lista.");
            throw err;
          }
          if (result.length > 0) {
            let sticker = result[Math.floor(Math.random() * result.length)];
            bot.sendSticker(msg.chat.id, sticker.id);
          } else {
            bot.sendMessage(msg.chat.id, "No hay stickers en la lista.");
          }
          db.close();
        });
    }
  );
};

services.deleteAllStickers = function(msg, bot, config, MongoClient){
 MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("midnightbot");
    var myquery = { };
    dbo.collection("stickers").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      if(obj.result.n > 0){
        bot.sendMessage(msg.chat.id, "Todos los stickers borrados.");
      }
      else{
        bot.sendMessage(msg.chat.id, "No había stickers que borrar.");
      }
      db.close();
    });
  })
}

services.deleteSticker = function(msg, bot, config, MongoClient){
  if(msg.reply_to_message != null && msg.reply_to_message.sticker != null && msg.reply_to_message.from.first_name == "Midnight Bot"){
    let deleting = msg.reply_to_message.sticker.file_id;
    MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("midnightbot");
      var myquery = { id: deleting };
      dbo.collection("stickers").deleteOne(myquery, function(err, obj) {
        if (err) throw err;        
        db.close();
        (obj.result.n > 0) ? bot.sendMessage(msg.chat.id, "Se ha borrado correctamente.") : bot.sendMessage(chatId, "No se ha borrado nada.");
      });
    });
  } else{
    bot.sendMessage(msg.chat.id, "Debes citar un sticker para poder borrarlo.");
  }
}

module.exports = services;
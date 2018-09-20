const Baits = require("./Texts/borde");
let services = {};


services.addAudio = function(msg, bot, config, MongoClient) {
  if (msg.reply_to_message != null) {
    if(msg.reply_to_message.voice == null){
      bot.sendMessage(msg.chat.id, "Me da que eso no es un audio.");
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
        var myobj = { id: msg.reply_to_message.voice.file_id, type: "audio" };
        dbo.collection("audios").insertOne(myobj, function(err, res) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
            throw err;
          }
          bot.sendMessage(msg.chat.id, "🗣 Audio añadido.");
          console.log(myobj);
          db.close();
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "Los audios no se añaden así 🙄");
  }
};

services.audio = function(msg, bot, config, MongoClient) {
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
        .collection("audios")
        .find({})
        .toArray(function(err, result) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido acceder a la lista.");
            throw err;
          }
          if (result.length > 0) {
            var audio = result[Math.floor(Math.random() * result.length)];

            bot.sendVoice(msg.chat.id, String(audio.id));
          } else {
            bot.sendMessage(msg.chat.id, "🗣 No hay audios.");
          }
          db.close();
        });
    }
  );
};

services.deleteAllAudios = function(msg, bot, config, MongoClient){
  if (!config.ownersID.includes(msg.from.id)) {
    bot.sendMessage(msg.chat.id, Baits.pickBait());
    return;
  }
 MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("midnightbot");
    var myquery = { };
    dbo.collection("audios").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      if(obj.result.n > 0){
        bot.sendMessage(msg.chat.id, "Todos borrados ❗️");
      }
      else{
        bot.sendMessage(msg.chat.id, "No había audios que borrar 🤷🏼‍♂️");
      }
      db.close();
    });
  })
}

services.deleteAudio = function(msg, bot, config, MongoClient){
  if (!config.ownersID.includes(msg.from.id)) {
    bot.sendMessage(msg.chat.id, Baits.pickBait());
    return;
  }
  if(msg.reply_to_message != null && msg.reply_to_message.from.first_name == "Midnight Bot"){
    if(msg.reply_to_message.voice == null){
      bot.sendMessage(msg.chat.id, "Creo que eso no es un audio...");
      return;
    }
    let deleting = msg.reply_to_message.voice.file_id;
    MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("midnightbot");
      var myquery = { id: deleting };
      dbo.collection("audios").deleteOne(myquery, function(err, obj) {
        if (err) throw err;        
        db.close();
        (obj.result.n > 0) ? bot.sendMessage(msg.chat.id, "Borrado 🤦🏻‍♂️") : bot.sendMessage(chatId, "No se ha borrado nada 💤");
      });
    });
  } else{
    bot.sendMessage(msg.chat.id, "Debes citar un audio para borrarlo.");
  }
}


module.exports = services;
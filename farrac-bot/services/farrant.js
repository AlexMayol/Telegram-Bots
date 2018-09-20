let services = {};


services.addFarrant = function(msg, bot, config, MongoClient) {
  if (msg.reply_to_message.from.id && msg.reply_to_message != null ) {
    MongoClient.connect(
      config.mongoURI,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) {
          bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
          throw err;
        }
        var dbo = db.db("farracbot");
        var myobj = { text: msg.reply_to_message.text, type: "farrant" };
        dbo.collection("farrants").insertOne(myobj, function(err, res) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido añadir.");
            throw err;
          }
          bot.sendMessage(msg.chat.id, "Farrant añadido correctamente.");
          db.close();
        });
      }
    );
  } else {
    bot.sendMessage(msg.chat.id, "Debes citar un farrant para poder añadirlo.");
  }
};

services.farrant = function(msg, bot, config, MongoClient) {
  MongoClient.connect(
    config.mongoURI,
    { useNewUrlParser: true },
    function(err, db) {
      if (err) {
        bot.sendMessage(msg.chat.id, "No se ha podido acceder a la lista.");
        throw err;
      }
      var dbo = db.db("farracbot");
      dbo
        .collection("farrants")
        .find({})
        .toArray(function(err, result) {
          if (err) {
            bot.sendMessage(msg.chat.id, "No se ha podido acceder a la lista.");
            throw err;
          }
          if (result.length > 0) {
            var farrant = result[Math.floor(Math.random() * result.length)];
            bot.sendMessage(msg.chat.id, farrant.text);
          } else {
            bot.sendMessage(msg.chat.id, "No hay farrants en la lista.");
          }
          db.close();
        });
    }
  );
};

services.deleteAllFarrants = function(msg, bot, config, MongoClient){
 MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("farracbot");
    var myquery = { };
    dbo.collection("farrants").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      if(obj.result.n > 0){
        bot.sendMessage(msg.chat.id, "Todos los farrrants borrados.");
      }
      else{
        bot.sendMessage(msg.chat.id, "No había farrrants que borrar.");
      }
      db.close();
    });
  })
}

services.deleteFarrant = function(msg, bot, config, MongoClient){
  if(msg.reply_to_message != null && msg.reply_to_message.text != null && msg.reply_to_message.from.first_name == "Midnight Bot"){
    let deleting = msg.reply_to_message.text;
    MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("farracbot");
      var myquery = { text: deleting };
      dbo.collection("farrants").deleteOne(myquery, function(err, obj) {
        if (err) throw err;        
        db.close();
        (obj.result.n > 0) ? bot.sendMessage(msg.chat.id, "Se ha borrado correctamente.") : bot.sendMessage(chatId, "No se ha borrado nada.");
      });
    });
  } else{
    bot.sendMessage(msg.chat.id, "Debes citar un farrant para poder borrarlo.");
  }
}


module.exports = services;
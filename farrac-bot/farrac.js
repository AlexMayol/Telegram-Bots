const config = require ('./farrac.config');
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(config.botToken, { polling: true });
var MongoClient = require("mongodb").MongoClient, format = require("util").format;
const Audio = require("./services/audios");
const Farrant = require("./services/farrant");
const Card = require("./services/card");
const GIF = require("./services/gifs");


bot.onText(/\/add_farrant/, msg => {
  const chatId = msg.chat.id;

  if(msg.reply_to_message){
    if(msg.reply_to_message.from.id != config.subjectID){
      bot.sendMessage(chatId, "El farrant debe haberlo escrito Farrac.");
      return;
    }
  var adding = msg.reply_to_message.text;
   MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
      if (err) {bot.sendMessage(chatId, "No se ha podido añadir.");throw err;}
      var dbo = db.db("farracbot");
      var myobj = { farrant: adding, type: "text" };
      dbo.collection("farrants").insertOne(myobj, function (err, res) {
        if (err) {bot.sendMessage(chatId, "No se ha podido añadir.");throw err;}
        bot.sendMessage(chatId, "Farrant añadido correctamente.");
        db.close();
      });
    });
  } else{
    bot.sendMessage(chatId, "Debes citar un farrant para poder añadirlo.");
  }
});

bot.onText(/\/delete_farrant/, msg => {
  const chatId = msg.chat.id;
  if(msg.reply_to_message != null && msg.reply_to_message.from.first_name == "Midnight Bot"){
    var deleting = msg.reply_to_message.text;

   MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("farracbot");
      var myquery = { farrant: deleting };
      dbo.collection("farrants").deleteOne(myquery, function(err, obj) {
        if (err) throw err;        
        db.close();
        (obj.result.n > 0) ? bot.sendMessage(chatId, "Se ha borrado correctamente.") : bot.sendMessage(chatId, "No se ha borrado nada.");
      });
    });
  } else{
    bot.sendMessage(chatId, "Debes citar un farrant para poder borrarlo.");
  }
});

bot.onText(/\/delete_all_farrants/, msg => {
  const chatId = msg.chat.id;

 MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("farracbot");
    var myquery = { };
    dbo.collection("farrants").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      // console.log(obj.result.n + " document(s) deleted");
      bot.sendMessage(chatId, "Todos los farrants borrados.");
      db.close();
    });
  })
});

bot.onText(/\/farrant/, msg => {
  const chatId = msg.chat.id;

 MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
    if (err) {
      bot.sendMessage(chatId, "No se ha podido acceder a la lista.");
      throw err;
    }
    var dbo = db.db("farracbot");
    dbo.collection("farrants").find({}).toArray(function(err, result) {
      if (err) {
        bot.sendMessage(chatId, "No se ha podido acceder a la lista.");
        throw err;
      }
      if (result.length > 0){
        var rant = result[Math.floor(Math.random()*result.length)];
        bot.sendMessage(chatId, rant.farrant);
      }else{
        bot.sendMessage(chatId, "No hay farrants en la lista.");
      }
      db.close();
    });
  });
});

bot.onText(/\/add_card/, msg => {
  const chatId = msg.chat.id;
  if(msg.reply_to_message.photo){
    var cards = msg.reply_to_message.photo;
    var card = cards[cards.length - 1].file_id;
    console.log(card)
   MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
      if (err) {bot.sendMessage(chatId, "No se ha podido añadir.");throw err;}
      var dbo = db.db("farracbot");
      var myobj = { card: card, type: "text" };
      dbo.collection("yugiohcards").insertOne(myobj, function (err, res) {
        if (err) {bot.sendMessage(chatId, "No se ha podido añadir.");throw err;}
        bot.sendMessage(chatId, "Carta añadida correctamente.");
        console.log(myobj);
        db.close();
      });
    });
  }
})

bot.onText(/\/delete_all_cards/, msg => {
  const chatId = msg.chat.id;

 MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("farracbot");
    dbo.collection("yugiohcards").deleteMany({}, function(err, obj) {
      if (err) throw err;
      console.log(obj.result.n + " document(s) deleted");
      bot.sendMessage(chatId, "Todas las cartas borradas.");
      db.close();
    });
  })
});

bot.onText(/\/duel/, msg => {
  const chatId = msg.chat.id;
 MongoClient.connect(config.mongoURI, {useNewUrlParser: true}, function(err, db) {
    if (err) {
      bot.sendMessage(chatId, "No se ha podido acceder a la lista.");
      throw err;
    }
    var dbo = db.db("farracbot");
    dbo.collection("yugiohcards").find({}).toArray(function(err, result) {
      if (err) {
        bot.sendMessage(chatId, "No se ha podido acceder a la lista.");
        throw err;
      }
      if (result.length > 0){       
        console.log(result) 
        var card = result[Math.floor(Math.random()*result.length)].card;
     
         bot.sendPhoto(chatId, card);
         bot.sendMessage(chatId, "Tu t-t-t-t-turno, @Farrac");
      }else{
        bot.sendMessage(chatId, "No hay cartas en el mazo.");
      }
      db.close();
    });
  });
})

bot.on("message", msg => {
  const chatId = msg.chat.id;
  let happy = ["por fin", "al fin", "felicidades", "qué bien", "me alegro"]

  for(h of happy){
    if(msg.text.toLowerCase().includes(h)){
      bot.sendMessage(chatId, "felicidades");
      return;
    }
  }
})

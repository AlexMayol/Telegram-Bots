const config = require("./midnight.config");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(config.botToken, { polling: true });
let MongoClient = require("mongodb").MongoClient;
const Audio = require("./services/audios");
const Temazo = require("./services/temazos");
const Sticker = require("./services/stickers");
const GIF = require("./services/gifs");
const OW = require("./services/Texts/OW");

bot.on("message", msg => {
  //console.log(msg)
  if(msg.from.id == "554595825"){ /// || msg.from.id == "15950318"
    let parse = msg.text.toLowerCase().split(" ");
    const intersection = OW.words.filter(word => parse.includes(word));
    if(intersection.length > 0){
      bot.sendMessage(msg.chat.id, OW.puns[Math.floor(Math.random() * OW.puns.length)])
    }
  }
});


bot.onText(/\/audio/i, msg => {
  Audio.audio(msg, bot, config, MongoClient);
});


bot.onText(/\/add_audio/i, msg => {
  Audio.addAudio(msg, bot, config, MongoClient);
});


bot.onText(/\/delete_audio/i, msg => {
  Audio.deleteAudio(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_all_audios/i, msg => {
  Audio.deleteAllAudios(msg, bot, config, MongoClient);
});

bot.onText(/\/temazo/i, msg => {
  Temazo.temazo(msg, bot, config, MongoClient);
});

bot.onText(/\/add_temazo/i, msg => {
  Temazo.addTemazo(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_temazo/i, msg => {
  Temazo.deleteTemazo(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_all_temazos/i, msg => {
  Temazo.deleteAllTemazos(msg, bot, config, MongoClient);
});

bot.onText(/\/sticker/i, msg => {
  Sticker.sticker(msg, bot, config, MongoClient);
});

bot.onText(/\/add_sticker/i, msg => {
  Sticker.addSticker(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_sticker/i, msg => {
  Sticker.deleteSticker(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_all_stickers/i, msg => {
  Sticker.deleteAllStickers(msg, bot, config, MongoClient);
});

bot.onText(/\/gif/i, msg => {
  GIF.GIF(msg, bot, config, MongoClient);
});

bot.onText(/\/add_gif/i, msg => {
  GIF.addGIF(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_gif/i, msg => {
  GIF.deleteGIF(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_all_gifs/i, msg => {
  GIF.deleteAllGIFs(msg, bot, config, MongoClient);
});


bot.on('polling_error', (error) => {
  console.log(error);  // => 'EFATAL'
});

bot.onText(/pole/i, msg => {
    bot.sendMessage(msg.chat.id,"Ni pole ni pola, anormal.");
 });

 bot.onText(/loli/i, msg => {
  bot.sendMessage(msg.chat.id,"@policia");
});

bot.onText(/teens/i, msg => {
  bot.sendMessage(msg.chat.id,"👻");
});
bot.on("edited_message",msg => {
  bot.sendMessage(msg.chat.id, "Si editas mensajes es que tienes cosas que ocultar.")
});

bot.on("pinned_message", msg => {
  bot.sendMessage(msg.chat.id, "Qué mensaje pineado ni qué niño muerto.")
})

bot.on("left_chat_member", msg => {
  bot.sendMessage(msg.chat.id, "Se ha ido porque sois todos unos payasos.")
});

bot.on("new_chat_title", msg => {
  bot.sendMessage(msg.chat.id, "Estate quieto, leches.")
});

bot.on("new_chat_photo", msg => {
  bot.sendMessage(msg.chat.id, "La de antes estaba mejor.")
});

const TelegramBot = require("node-telegram-bot-api");
let MongoClient = require("mongodb").MongoClient; // Remove this when any function use it
const config = require("./midnight.config");
const { AudioController } = require("./controllers");
const database = require("./database");
const Audio = require("./services/audios");
const Hits = require("./services/hits");
const Sticker = require("./services/stickers");
const GIF = require("./services/gifs");
const OW = require("./services/Texts/OW");

const bot = new TelegramBot(config.botToken, { polling: true });

database.connect(err => {
  if (err) {
    console.error(
      `It's not possible to connect with database because: ${err.message}`
    );
    return process.exit();
  }
  console.log("Database connected");
});

bot.on("message", msg => {
  //console.log(msg)
  if (msg.from.id == "554595825") {
    /// || msg.from.id == "15950318"
    let parse = msg.text.toLowerCase().split(" ");
    const intersection = OW.words.filter(word => parse.includes(word));
    if (intersection.length > 0) {
      bot.sendMessage(
        msg.chat.id,
        OW.puns[Math.floor(Math.random() * OW.puns.length)]
      );
    }
  }
});

bot.onText(/\/audio/i, msg => AudioController.audio(bot, msg));

bot.onText(/\/add_audio/i, msg => AudioController.addAudio(bot, msg));

bot.onText(/\/delete_audio/i, msg => {
  Audio.deleteAudio(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/delete_all_audios/i, msg => {
  Audio.deleteAllAudios(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/temazo/i, msg => {
  Hits.temazo(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/add_temazo/i, msg => {
  Hits.addTemazo(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/delete_temazo/i, msg => {
  Hits.deleteTemazo(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/delete_all_temazos/i, msg => {
  Hits.deleteAllTemazos(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/sticker/i, msg => {
  Sticker.sticker(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/add_sticker/i, msg => {
  Sticker.addSticker(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/delete_sticker/i, msg => {
  Sticker.deleteSticker(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/delete_all_stickers/i, msg => {
  Sticker.deleteAllStickers(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/gif/i, msg => {
  GIF.GIF(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/add_gif/i, msg => {
  GIF.addGIF(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/delete_gif/i, msg => {
  GIF.deleteGIF(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.onText(/\/delete_all_gifs/i, msg => {
  GIF.deleteAllGIFs(msg, bot, config, MongoClient); // Remove Mongoclient parameter
});

bot.on("polling_error", error => {
  console.log(error); // => 'EFATAL'
});

bot.onText(/pole/i, msg => {
  bot.sendMessage(msg.chat.id, "Ni pole ni pola, anormal.");
});

bot.onText(/loli/i, msg => {
  bot.sendMessage(msg.chat.id, "@policia");
});

bot.onText(/teens/i, msg => {
  bot.sendMessage(msg.chat.id, "👻");
});
// bot.on("edited_message",msg => {
//   bot.sendMessage(msg.chat.id, "Si editas mensajes es que tienes cosas que ocultar.")
// });

bot.on("pinned_message", msg => {
  bot.sendMessage(msg.chat.id, "Qué mensaje pineado ni qué niño muerto.");
});

bot.on("left_chat_member", msg => {
  bot.sendMessage(msg.chat.id, "Se ha ido porque sois todos unos payasos.");
});

bot.on("new_chat_title", msg => {
  bot.sendMessage(msg.chat.id, "Estate quieto, leches.");
});

bot.on("new_chat_photo", msg => {
  bot.sendMessage(msg.chat.id, "La de antes estaba mejor.");
});

process.on("SIGINT", () => {
  database.close();
});

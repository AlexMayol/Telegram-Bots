const config = require("./midnight.config");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(config.botToken, { polling: true });
let MongoClient = require("mongodb").MongoClient;
const Audio = require("./services/audios");
const Temazo = require("./services/temazos");
const Sticker = require("./services/stickers");
const GIF = require("./services/gifs");
const Fact = require("./services/facts");

bot.on("message", msg => {
 // console.log(msg)
  // bot.forwardMessage(<your group id>, <source group id>, msg.id)
  // bot.forwardMessage(-254703562, -254703562, 4433,)
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

bot.onText(/\/fact/i, msg => {
  Fact.fact(msg, bot, config, MongoClient);
});


bot.on('polling_error', (error) => {
  console.log(error);  // => 'EFATAL'
});


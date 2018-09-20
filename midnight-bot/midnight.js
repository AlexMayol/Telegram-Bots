const config = require("./midnight.config");
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(config.botToken, { polling: true });

var MongoClient = require("mongodb").MongoClient;

bot.on("message", msg => {
//   bot.sendAudio(msg.chat.id, 'CQADBAAD8wMAAsUyGVHENnl9mKwoEwI')
console.log(msg)
});

bot.onText(/\/audio/i, msg => {
  const action = require('./services/audios').audio;
  action(msg, bot, config, MongoClient);
});


bot.onText(/\/add_audio/i, msg => {
  const action = require('./services/audios').addAudio;
  action(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_all_audios/i, msg => {
  const action = require('./services/audios').deleteAllAudios;
  action(msg, bot, config, MongoClient);
});

bot.onText(/\/temazo/i, msg => {
  const action = require('./services/temazos').temazo;
  action(msg, bot, config, MongoClient);
});


bot.onText(/\/add_temazo/i, msg => {
  const action = require('./services/temazos').addTemazo;
  action(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_temazo/i, msg => {
  const action = require('./services/temazos').deleteTemazo;
  action(msg, bot, config, MongoClient);
});


bot.onText(/\/delete_all_temazos/i, msg => {
  const action = require('./services/temazos').deleteAllTemazos;
  action(msg, bot, config, MongoClient);
});


bot.onText(/\/sticker/i, msg => {
  const action = require('./services/stickers').sticker;
  action(msg, bot, config, MongoClient);
});


bot.onText(/\/add_sticker/i, msg => {
  const action = require('./services/stickers').addSticker;
  action(msg, bot, config, MongoClient);
});

bot.onText(/\/delete_sticker/i, msg => {
  const action = require('./services/stickers').deleteSticker;
  action(msg, bot, config, MongoClient);
});


bot.onText(/\/delete_all_stickers/i, msg => {
  const action = require('./services/stickers').deleteAllStickers;
  action(msg, bot, config, MongoClient);
});



bot.on('polling_error', (error) => {
  console.log(error);  // => 'EFATAL'
});


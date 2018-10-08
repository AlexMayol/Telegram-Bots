const TelegramBot = require("node-telegram-bot-api");
const config = require("./midnight.config");

const { AudioController, GifController } = require("./controllers");

const database = require("./database");

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

bot.onText(/\/audio/i, msg => AudioController.audio(bot, msg));

bot.onText(/\/add_audio/i, msg => AudioController.addAudio(bot, msg));

bot.onText(/\/delete_audio/i, msg => AudioController.deleteAudio(bot, msg));

bot.onText(/\/delete_all_audios/i, msg => AudioController.deleteAllAudios(bot, msg));

bot.onText(/\/gif/i, msg => GifController.gif(bot, msg));

bot.onText(/\/add_gif/i, msg => GifController.addGif(bot, msg));

bot.onText(/\/delete_gif/i, msg => GifController.deleteGif(bot, msg));

bot.onText(/\/delete_all_gifs/i, msg => GifController.deleteAllGifs(bot, msg));


bot.on("polling_error", error => {
  console.log(error); // => 'EFATAL'
});


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

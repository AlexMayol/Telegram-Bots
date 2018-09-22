const Audio = require("../services/audios");

exports.addAudio = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los audios no se añaden así 🙄");
  }

  if (!reply_to_message.voice) {
    bot.sendMessage(chat.id, "Me da que eso no es un audio.");
  }

  Audio.addAudio({ id: reply_to_message.voice.file_id }, err => {
    if (err) {
      console.error(err);
      return bot.sendMessage(chat.id, "No se ha podido añadir.");
    }
    bot.sendMessage(chat.id, "🗣 Audio añadido.");
  });
};

exports.audio = (bot, { chat }) => Audio.audio((err, audio) => {
    if (err) {
        console.error(err);
        return bot.sendMessage(msg.chat.id, "No se ha podido acceder a la lista.");
      }

      if(!audio){
          return  bot.sendMessage(msg.chat.id, "🗣 No hay audios.");
      }

      bot.sendVoice(chat.id, `${audio.id}`);
});
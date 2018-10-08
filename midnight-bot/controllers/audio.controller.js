const Audio = require("../services/audios");

exports.audio = (bot, { chat }) =>
  Audio.audio((err, audio) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido acceder a la lista.");
    }
    if (!audio) {
      return bot.sendMessage(chat.id, "🗣 No hay audios.");
    }
    bot.sendVoice(chat.id, audio.id);
  });


exports.addAudio = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los audios no se añaden así 🙄");
  }

  if (!reply_to_message.voice) {
    return bot.sendMessage(chat.id, "Me da que eso no es un audio.");
  }

  Audio.addAudio({ id: reply_to_message.voice.file_id }, err => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido añadir.");
    }
    bot.sendMessage(chat.id, "🗣 Audio añadido.");
  });
};



exports.deleteAudio = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los audios no se borran así 🙄");
  }
  if (!reply_to_message.voice) {
    return bot.sendMessage(chat.id, "Me da que eso no es un audio.");
  }
  Audio.deleteAudio(reply_to_message, (err, res) => {
      if (err) {
        return bot.sendMessage(chat.id, "No se ha podido borrar.");
      }
      bot.sendMessage(chat.id, "🗣 Audio borrado.");
    });
};

exports.deleteAllAudios = (bot, { chat }) => {
  Audio.deleteAllAudios( (err, res) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido borrar.");
    }
    return bot.sendMessage(chat.id, "🗣 Todos los audios borrados.");
  });
};

const Hit = require("../services/hits");

exports.hit = (bot, { chat }) =>
  Hit.hit((err, hit) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido acceder a la lista.");
    }
    if (!hit) {
      return bot.sendMessage(chat.id, "No hay temazos.");
    }
    console.log(hit);
    bot.sendAudio(chat.id, hit.id);
  });


exports.addHit = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los temazos no se añaden así 🙄");
  }

  if (!reply_to_message.audio) {
    return bot.sendMessage(chat.id, "Me da que eso no es un temazo.");
  }

  Hit.addHit({ id: reply_to_message.audio.file_id }, err => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido añadir.");
    }
    bot.sendMessage(chat.id, "🗣 Temazo añadido.");
  });
};



exports.deleteHit = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los temazos no se borran así 🙄");
  }
  if (!reply_to_message.audio) {
    return bot.sendMessage(chat.id, "Me da que eso no es un temazo.");
  }
  Hit.deleteHit(reply_to_message, (err, res) => {
      if (err) {
        return bot.sendMessage(chat.id, "No se ha podido borrar.");
      }
      bot.sendMessage(chat.id, "Temazo borrado.");
    });
};

exports.deleteAllHits = (bot, { chat }) => {
  Hit.deleteAllHits( (err, res) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido borrar.");
    }
    return bot.sendMessage(chat.id, "🗣 Todos los temazos borrados.");
  });
};

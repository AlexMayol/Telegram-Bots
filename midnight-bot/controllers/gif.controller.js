const Gif = require("../services/gifs");

exports.gif = (bot, { chat }) =>
  Gif.gif((err, gif) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido acceder a la lista.");
    }
    if (!gif) {
      return bot.sendMessage(chat.id, "No hay gifs.");
    }
    bot.sendDocument(chat.id, gif.id);
  });


exports.addGif = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los gifs no se añaden así 🙄");
  }

  if (!reply_to_message.animation) {
    return bot.sendMessage(chat.id, "Me da que eso no es un gif.");
  }

  Gif.addGif({ id: reply_to_message.animation.file_id }, err => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido añadir.");
    }
    bot.sendMessage(chat.id, "Gif añadido.");
  });
};



exports.deleteGif = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los gifs no se borran así 🙄");
  }
  if (!reply_to_message.animation) {
    return bot.sendMessage(chat.id, "Me da que eso no es un gif.");
  }
  Gif.deleteGif(reply_to_message, (err, res) => {
      if (err) {
        return bot.sendMessage(chat.id, "No se ha podido borrar.");
      }
      bot.sendMessage(chat.id, "Gif borrado.");
    });
};

exports.deleteAllGifs = (bot, { chat }) => {
  Gif.deleteAllGifs( (err, res) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido borrar.");
    }
    return bot.sendMessage(chat.id, "Todos los gifs borrados.");
  });
};

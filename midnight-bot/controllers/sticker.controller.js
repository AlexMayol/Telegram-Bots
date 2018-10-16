const Sticker = require("../services/stickers");

exports.sticker = (bot, { chat }) =>
  Sticker.sticker((err, sticker) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido acceder a la lista.");
    }
    if (!sticker) {
      return bot.sendMessage(chat.id, "No hay stickers.");
    }
    bot.sendSticker(chat.id, sticker.id);
  });

exports.addSticker = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los stickers no se añaden así 🙄");
  }

  if (!reply_to_message.sticker) {
    return bot.sendMessage(chat.id, "Me da que eso no es un sticker.");
  }

  Sticker.addSticker({ id: reply_to_message.sticker.file_id }, err => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido añadir.");
    }
    bot.sendMessage(chat.id, "Sticker añadido.");
  });
};

exports.deleteSticker = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los stickers no se borran así 🙄");
  }
  if (!reply_to_message.sticker) {
    return bot.sendMessage(chat.id, "Me da que eso no es un sticker.");
  }
  Sticker.deleteSticker(reply_to_message, (err, res) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido borrar.");
    }
    bot.sendMessage(chat.id, "Sticker borrado.");
  });
};

exports.deleteAllStickers = (bot, { chat }) => {
  Sticker.deleteAllStickers((err, res) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido borrar.");
    }
    return bot.sendMessage(chat.id, "🗣 Todos los stickers borrados.");
  });
};

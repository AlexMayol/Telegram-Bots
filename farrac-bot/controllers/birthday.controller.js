const Birthday = require("../services/birthday");

exports.birthday = (bot, { chat }) => Birthday.birthday((err, bday) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido acceder a la lista.");
    }
    if (!bday) {
      return bot.sendMessage(chat.id, "No hay farrants.");
    }
    //bot.sendMessage(chat.id, farrant.text);
  });

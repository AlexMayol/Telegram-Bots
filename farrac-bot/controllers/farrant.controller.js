const Farrant = require("../services/farrants");


exports.spoiler = (bot, { chat }) =>
Farrant.spoiler((err, spoiler) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido acceder a la lista.");
    }
    if (!spoiler) {
      return bot.sendMessage(chat.id, "No hay spoilers.");
    }
    // console.log(spoiler)
    bot.sendMessage(chat.id, spoiler.text);
  });

  exports.addSpoiler = (bot, { reply_to_message, chat }) => {
    if (!reply_to_message) {
      return bot.sendMessage(chat.id, "Los spoilers no se añaden así 🙄");
    }
  
    if(reply_to_message.forward_from && reply_to_message.forward_from.id == process.env.FARRAC) {
      // console.log("ok")
      Farrant.addSpoiler({ text: reply_to_message.text}, err => {
        if (err) {
          return bot.sendMessage(chat.id, "No se ha podido añadir el spoiler.");
        }
        bot.sendMessage(chat.id, "Spoiler añadido.");
      });
      return;
    }
  // console.log("k")
    if (reply_to_message.from.id != process.env.FARRAC) {
      return bot.sendMessage(chat.id, "Me da que eso no es un spoiler.");    
    }
  
    Farrant.addSpoiler({ text: reply_to_message.text}, err => {
      if (err) {
        return bot.sendMessage(chat.id, "No se ha podido añadir.");
      }
      bot.sendMessage(chat.id, "Spoiler añadido.");
    });
  };

exports.deleteSpoiler = (bot, { reply_to_message, chat, from}) => { 
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los spoilers no se borran así 🙄");
  }
  // if (reply_to_message.from.id != process.env.FARRAC) {
  //   return bot.sendMessage(chat.id, "Me da que eso no es un farrant.");
  // }
  if (from.id != process.env.FARRAC && from.id != process.env.ALEX) {
    return bot.sendMessage(chat.id, "Tú no puedes hacer eso... 🙄");
  }
  Farrant.deleteSpoiler(reply_to_message, (err, res) => {
      if (err) {
        return bot.sendMessage(chat.id, "No se ha podido borrar.");
      }
      bot.sendMessage(chat.id, "Spoiler borrado.");
    });
};

exports.farrant = (bot, { chat }) =>
Farrant.farrant((err, farrant) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido acceder a la lista.");
    }
    if (!farrant) {
      return bot.sendMessage(chat.id, "No hay farrants.");
    }
    // console.log(farrant)
    bot.sendMessage(chat.id, farrant.text);
  });


exports.addFarrant = (bot, { reply_to_message, chat }) => {
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los farrants no se añaden así 🙄");
  }

  if(reply_to_message.forward_from && reply_to_message.forward_from.id == process.env.FARRAC) {
    Farrant.addFarrant({ text: reply_to_message.text}, err => {
      if (err) {
        return bot.sendMessage(chat.id, "No se ha podido añadir.");
      }
      bot.sendMessage(chat.id, "Farrant añadido.");
    });
    return;
  }

  if (reply_to_message.from.id != process.env.FARRAC) {
    return bot.sendMessage(chat.id, "Me da que eso no es un farrant.");    
  }

  Farrant.addFarrant({ text: reply_to_message.text}, err => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido añadir.");
    }
    bot.sendMessage(chat.id, "Farrant añadido.");
  });
};


exports.listFarrants = (bot, { chat }) =>
Farrant.listFarrants((err, farrantList) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido acceder a la lista.");
    }
    if (!farrantList) {
      return bot.sendMessage(chat.id, "No hay farrants activos.");
    }
    // console.log(farrantList)
    for(let farrant of farrantList){
      bot.sendMessage(chat.id, farrant.text);
    }
  });


exports.listDeleteds = (bot, { chat }) =>
Farrant.listDeleteds((err, farrantList) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido acceder a la lista.");
    }
    if (!farrantList) {
      return bot.sendMessage(chat.id, "No hay farrants borrados.");
    }
    // console.log(farrantList)
    for(let farrant of farrantList){
      bot.sendMessage(chat.id, farrant.text);
    }
  });



exports.deleteFarrant = (bot, { reply_to_message, chat, from}) => { 
  if (!reply_to_message) {
    return bot.sendMessage(chat.id, "Los farrants no se borran así 🙄");
  }
  // if (reply_to_message.from.id != process.env.FARRAC) {
  //   return bot.sendMessage(chat.id, "Me da que eso no es un farrant.");
  // }
  if (from.id != process.env.FARRAC && from.id != process.env.ALEX) {
    return bot.sendMessage(chat.id, "Tú no puedes hacer eso... 🙄");
  }
  Farrant.deleteFarrant(reply_to_message, (err, res) => {
      if (err) {
        return bot.sendMessage(chat.id, "No se ha podido borrar.");
      }
      bot.sendMessage(chat.id, "Farrant borrado.");
    });
};

exports.deleteAllFarrants = (bot, { chat }) => {
  Farrant.deleteAllFarrants( (err, res) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido borrar.");
    }
    return bot.sendMessage(chat.id, "Todos los farrants borrados.");
  });
};


exports.erase = (bot, { chat }) => {
  Farrant.erase( (err, res) => {
    if (err) {
      return bot.sendMessage(chat.id, "No se ha podido borrar.");
    }
    return bot.sendMessage(chat.id, "Todos los farrants borrados DEL TODO");
  });
};

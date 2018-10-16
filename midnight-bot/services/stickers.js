const database = require("../database");
const services = {};

const collection = "stickers";

services.addSticker = ({ id }, callback) => {
  const inputData = { id, type: "sticker" };
  database.collection(collection).insertOne(inputData, callback);
};


services.sticker = callback =>
  database
    .collection(collection)
    .find({})
    .toArray(function(err, result) {
      if (err) return callback(err);
      if (result.length == 0) return callback();

      const sticker = result[Math.floor(Math.random() * result.length)];
      callback(null, sticker);
    });

services.deleteSticker = ({ sticker }, callback) => {
  database
    .collection(collection)
    .deleteOne({ id: sticker.file_id }, (err, result) => {
      if (err) throw err;
      if (result.deletedCount > 0) return callback(null, true);
    });
};

services.deleteAllStickers = callback =>
  database.collection(collection).deleteMany({}, (err, result) => {
    if (err) throw err;
    console.log(result)
    if (result.deletedCount > 0) callback(null, true);
  });

module.exports = services;

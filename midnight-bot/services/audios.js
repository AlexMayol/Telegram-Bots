const database = require("../database");
const services = {};

const collection = "audios";

services.addAudio = ({ id }, callback) => {
  const inputData = { id, type: "audio" };
  database.collection(collection).insertOne(inputData, callback);
};

services.audio = callback =>
  database
    .collection(collection)
    .find({})
    .toArray(function(err, result) {
      if (err) return callback(err);
      if (result.length == 0) return callback();

      const audio = result[Math.floor(Math.random() * result.length)];
      callback(null, audio);
    });

services.deleteAudio = ({ voice }, callback) => {
  database
    .collection(collection)
    .deleteOne({ id: voice.file_id }, (err, result) => {
      if (err) throw err;
      if (result.deletedCount > 0) return callback(null, true);
    });
};

services.deleteAllAudios = callback =>
  database.collection(collection).deleteMany({}, (err, result) => {
    if (err) throw err;
    console.log(result)
    if (result.deletedCount > 0) callback(null, true);
  });

module.exports = services;

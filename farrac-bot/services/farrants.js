const database = require("../database");
const services = {};

const collection = "farrants";

services.addFarrant = ({ text }, callback) => {
  const inputData = { text, type: "farrant" };
  database.collection(collection).insertOne(inputData, callback);
};

services.farrant = callback =>
  database
    .collection(collection)
    .find({})
    .toArray(function(err, result) {
      if (err) return callback(err);
      if (result.length == 0) return callback();

      const farrant = result[Math.floor(Math.random() * result.length)];
      callback(null, farrant);
    });

services.deleteFarrant = (reply_to_message, callback) => {
  console.log(reply_to_message)
  database
    .collection(collection)
    .deleteOne({ id: reply_to_message.file_id }, (err, result) => {
      if (err) throw err;
      if (result.deletedCount > 0) return callback(null, true);
    });
};

services.deleteAllFarrants = callback =>
  database.collection(collection).deleteMany({}, (err, result) => {
    if (err) throw err;
    console.log(result)
    if (result.deletedCount >= 0) callback(null, true);
  });

module.exports = services;

const database = require("../database");
const services = {};

const collection = "farrants";
const spoilers = "spoilers";


services.addSpoiler = ({
  text
}, callback) => {
  database
    .collection(spoilers)
    .find({
      text
    })
    .toArray(function(err, result) {
      if (err) return callback(err);
      if (result.length == 0) {

        const inputData = {
          text,
          type: "spoiler",
          active: 1
        };
        database.collection(spoilers).insertOne(inputData, callback);
      }

    });
};

services.spoiler = callback => {
  database
    .collection(spoilers)
    .find({active:1})
    .toArray(function(err, result) {
      if (err) return callback(err);
      if (result.length == 0) return callback();

      const spoil = result[Math.floor(Math.random() * result.length)];
      callback(null, spoil);
    });
}

services.deleteSpoiler = (reply_to_message, callback) => {
  database
    .collection(spoilers)
    .updateOne({
      text:reply_to_message.text
    }, {
      $set: {
        active: 0
      }
    }, (err, result) => {
      if (err) throw err;
      if (result.modifiedCount > 0) return callback(null, true);
    });
};


services.addFarrant = ({
  text
}, callback) => {

  database
    .collection(collection)
    .find({
      text
    })
    .toArray(function(err, result) {
      if (err) return callback(err);
      if (result.length == 0) {

        const inputData = {
          text,
          type: "farrant",
          active: 1
        };
        database.collection(collection).insertOne(inputData, callback);
      }

    });

};


services.farrant = callback => {
  database
    .collection(collection)
    .find({active:1})
    .toArray(function(err, result) {
      if (err) return callback(err);
      if (result.length == 0) return callback();

      const farrant = result[Math.floor(Math.random() * result.length)];
      callback(null, farrant);
    });
}

services.listFarrants = callback =>
  database
  .collection(collection)
  .find({
    active: 1
  })
  .toArray(function(err, result) {
    if (err) return callback(err);
    if (result.length == 0) return callback();

    const farrantList = result;
    callback(null, farrantList);
  });

services.listDeleteds = callback =>
  database
  .collection(collection)
  .find({
    active: 0
  })
  .toArray(function(err, result) {
    if (err) return callback(err);
    if (result.length == 0) return callback();

    const farrantList = result;
    callback(null, farrantList);
  });


services.deleteFarrant = (reply_to_message, callback) => {
  database
    .collection(collection)
    .updateOne({
      text:reply_to_message.text
    }, {
      $set: {
        active: 0
      }
    }, (err, result) => {
      if (err) throw err;
      if (result.modifiedCount > 0) return callback(null, true);
    });
};

services.deleteAllFarrants = callback => {
  database
  .collection(collection)
  .updateMany({
    active:1
  }, {
    $set: {
      active: 0
    }
  }, (err, result) => {
    if (err) throw err;
    if (result.modifiedCount > 0) return callback(null, true);
  });
}

services.erase = callback =>
  database.collection(collection).deleteMany({}, (err, result) => {
    if (err) throw err;
    if (result.deletedCount >= 0) callback(null, true);
  });

module.exports = services;
const database = require("../database");
const services = {};

const collection = "birthday";

services.addFarrant = ({ text }, callback) => {
  const inputData = { text, type: "farrant" };
  database.collection(collection).insertOne(inputData, callback);
};

services.birthday = callback =>{
  
  }


module.exports = services;

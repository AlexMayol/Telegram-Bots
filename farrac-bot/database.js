const { MongoClient } = require("mongodb");
const { mongoURI, mongoDatabaseName } = require("./farrac.config");

class Database {
  connect(callback) {
    MongoClient.connect(
      mongoURI,
      { useNewUrlParser: true },
      (err, driver) => {
        if (err) return callback(err);
        this.driver = driver;
        this.db = driver.db(mongoDatabaseName);
        if (callback) callback();
      }
    );
  }

  collection(name) {
    return this.db.collection(name);
  }

  close() {
    this.driver.close();
  }
}

module.exports = new Database();
module.exports.Database = Database;

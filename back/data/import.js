const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

const dbname = 'products_database';
const collection = 'products';

const file = require('./products.json');

async function addData(fileToAdd, collectionToAdd) {
  mongoClient.connect(url, {}, (error, clientDb) => {
    if (error) console.log(`no connection`);
    const db = clientDb.db(dbname);
    try {
      db.collection(collectionToAdd).insertMany(fileToAdd);
    } catch (err) {
      console.log(err);
    }
  });
}

addData(file, collection);

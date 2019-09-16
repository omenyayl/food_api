const MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://localhost:27017';
const NAME = 'usda';
const COLLECTION = 'food';

class DBConnector {
    constructor (url, name, collection) {
        this.url = url;
        this.name = name;
        this.collection = collection;
    }

    static getInstance() {
        if (!DBConnector.instance) DBConnector.instance = new DBConnector(URL, NAME, COLLECTION);
        return DBConnector.instance;
    }

    getDB () {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
            }
            else {
                MongoClient.connect(this.url, {
                    useUnifiedTopology: true,
                    useNewUrlParser: true
                }).then(client => {
                    this.db = client.db(this.name).collection(this.collection);
                    resolve(this.db);
                }).catch(e => reject(e));
            }
        });
    }

    closeDB() {
        if (this.db) this.db.close();
    }
}

exports.DBConnector = DBConnector;
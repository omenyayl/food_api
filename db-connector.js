const MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://localhost:27017';
const NAME = 'usda';
const COLLECTION = 'food';

class DBConnector {
    static instance;
    url;
    name;
    collection;
    db;

    constructor (url, name, collection) {
        this.url = url;
        this.name = name;
        this.collection = collection;
    }

    static getInstance() {
        if (!this.instance) this.instance = new DBConnector(URL, NAME, COLLECTION);
        return this.instance;
    }

    getDB () {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
            }
            else {
                MongoClient.connect(URL, {
                    useUnifiedTopology: true,
                    useNewUrlParser: true
                }).then(client => {
                    this.db = client.db(NAME).collection(COLLECTION);
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
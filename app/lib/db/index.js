const MongoClient = require("mongodb").MongoClient;

const MongoConfig = require("./../../../config/database.json");
// const ConfigMain = require("./../../../config/main");
const mongoLogin = process.env.username1;
const mongoPass = process.env.password;

console.log("mongoLogin", mongoLogin);
console.log("mongoPass", mongoPass);
const MongoConnectOptions = {
    useNewUrlParser: true,
    promiseLibrary: global.Promise,
    keepAlive: true,
    reconnectTries: 30,
    reconnectInterval: 500 // Reconnect every 500ms
};

const mongoURI = String(MongoConfig.uri)
    .replace("{username}", mongoLogin)
    .replace("{password}", mongoPass)
    .replace("{dbname}", "admin");
console.log("mongoURI", mongoURI);

console.log("Connecting to database...");

const dbClient = new MongoClient(mongoURI, MongoConnectOptions);

const dbClientPromise = dbClient.connect().then((client) => {
    console.log("db connection successful");
    return client;
});

module.exports = {
    dbClient,
    peekbagDB: () => dbClient.db("peekbagadmin")
};

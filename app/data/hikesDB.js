const { peekbagDB } = require("./../lib/db");
const { ObjectID } = require("mongodb");
const collection = () => peekbagDB().collection("hikes");

const insert = (hike) => {
    return collection().insertOne(hike);
};

const fetch = () => {
    return collection().find();
};

module.exports = { insert, fetch };

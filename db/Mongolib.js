const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.mongourl;

const dbName = 'appJwt';

const client = new MongoClient(url, { useUnifiedTopology: true });

let db;

const connect = async (databName = dbName) => {
    const conn = await client.connect();
    db = conn.db(databName);
    return client;
}

/* Usuarios. */
const findUsuarios = function (callback) {
    const collection = db.collection('usuario');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const findUsuario = async function (query, callback) {
    const collection = db.collection('usuario');
    const user = await collection.findOne(query);
    callback(user);
}

const insertUsuario = async function (doc, callback) {
    const collection = db.collection('usuario');
    const user = await collection.insertOne(doc);
    callback(user);
}

const updateUsuario = async function (filter, doc, callback) {
    const collection = db.collection('usuario');
    const user = await collection.updateOne(filter, doc);
    callback(user);
}

const deleteUsuario = async function (query, callback) {
    const collection = db.collection('usuario');
    const user = await collection.deleteOne(query);
    callback(user);
}

/* Entrenamiento. */
const findLibros = function (callback) {
    const collection = db.collection('entrenamiento');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const findLibro = async function (query, callback) {
    const collection = db.collection('entrenamiento');
    const user = await collection.findOne(query);
    callback(user);
}

const insertLibro = async function (doc, callback) {
    const collection = db.collection('entrenamiento');
    const user = await collection.insertOne(doc);
    callback(user);
}

const updateLibro = async function (filter, doc, callback) {
    const collection = db.collection('entrenamiento');
    const user = await collection.updateOne(filter, doc);
    callback(user);
}

const deleteLibro = async function (query, callback) {
    const collection = db.collection('entrenamiento');
    const user = await collection.deleteOne(query);
    callback(user);
}



exports.findUsuarios = findUsuarios;
exports.findUsuario = findUsuario;
exports.insertUsuario = insertUsuario;
exports.updateUsuario = updateUsuario;
exports.deleteUsuario = deleteUsuario;

exports.findLibros = findLibros;
exports.findLibro = findLibro;
exports.insertLibro = insertLibro;
exports.updateLibro = updateLibro;
exports.deleteLibro = deleteLibro;

exports.connect = connect;
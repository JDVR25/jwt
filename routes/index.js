var express = require('express');
var router = express.Router();
const Mongolib = require("../db/Mongolib");
var CryptoJS = require("crypto-js");

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.getLibros('/libro', middleware.checkTokenLector, function (req, res, next) {
  Mongolib.findLibros(docs => {
    res.send(docs);
  })
});

router.post('/login', HandlerGenerator.login);

router.post('/signup', function (req, res, next) {
  const cuerpo = req.body;
  const query = { username: req.body.username };
  var consulta;
  Mongolib.findUsuario(query, docs => {
    consulta = docs;
    if (consulta === null) {
      const doc = {
        username: cuerpo.username,
        password: CryptoJS.SHA256(cuerpo.password),
        role: cuerpo.role
      };
      Mongolib.insertUsuario(doc, docs => {
        res.status(201);
        res.send(docs);
      })

    }
    else {
      res.status(412);
      res.send('Ya existe un usuario con el correo dado');
    }
  })
});

router.post('/libro', middleware.checkTokenEscritor, function (req, res, next) {
  const cuerpo = req.body;
  const query = { titulo: req.body.titulo };
  var consulta;
  Mongolib.findLibro(query, docs => {
    consulta = docs;
    if (consulta === null) {
      const doc = {
        titulo: cuerpo.titulo,
        contenido: cuerpo.contenido
      };
      Mongolib.insertLibro(doc, docs => {
        res.status(201);
        res.send(docs);
      })

    }
    else {
      res.status(412);
      res.send();
    }
  })
});

module.exports = router;
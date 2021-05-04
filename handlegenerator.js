let jwt = require('jsonwebtoken');
let config = require('./config');
const Mongolib = require("../db/Mongolib");
var CryptoJS = require("crypto-js");

// Clase encargada de la creación del token
class HandlerGenerator {

    login(req, res) {

        // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
        let username = req.body.username;
        let password = CryptoJS.SHA256(req.body.password);

        // Este usuario y contraseña, en un ambiente real, deben ser traidos de la BD
        const query = { username: req.params.usuario };
        Mongolib.findUsuario(query, docs => {
            if (!(docs === null)) {
                let mockedUsername = docs.username;
                let mockedPassword = docs.password;
                const mockedRole = docs.role

                // Si se especifico un usuario y contraseña, proceda con la validación
                // de lo contrario, un mensaje de error es retornado
                if (username && password && (mockedRole === 'admin' || mockedRole === 'lector' || mockedRole === 'escritor')) {

                    // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
                    // de lo contrario, un mensaje de error es retornado
                    if (username === mockedUsername && password === mockedPassword) {

                        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                        let tokenSecret;
                        if(mockedRole === 'admin')
                        {
                            tokenSecret = process.env.secretAdmin;
                        }
                        else if(mockedRole === 'lector')
                        {
                            tokenSecret = process.env.secretLector;
                        }
                        else if(mockedRole === 'escritor')
                        {
                            tokenSecret = process.env.secretEscritor;
                        }
                        let token = jwt.sign({ username: username },
                            tokenSecret, { expiresIn: '24h' });

                        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                        res.json({
                            success: true,
                            message: 'Authentication successful!',
                            token: token
                        });

                    } else {

                        // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
                        res.send(403).json({
                            success: false,
                            message: 'Incorrect username or password'
                        });

                    }

                } else {

                    // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
                    res.send(400).json({
                        success: false,
                        message: 'Authentication failed! Please check the request'
                    });

                }
            }
            else {
                res.status(404);
                res.send(docs);
            }
        })


    }

    index(req, res) {

        // Retorna una respuesta exitosa con previa validación del token
        res.json({
            success: true,
            message: 'Index page'
        });

    }
}

module.exports = HandlerGenerator;
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        // se crea la app de express en la clase del servidor
        this.app = express();
        this.port = process.env.PORT;

        // path de la ruta
        this.usuariosPath = '/api/usuarios';

        // middlewares => funciones que añaden funciones
        this.middlewares();


        // rutas de la app
        this.routes();

    }

    middlewares() {
        // directorio publico que se llama
        this.app.use( express.static('public') );
        this.app.use(cors());
        // lectura y parseo del body
        this.app.use( express.json());
    }

    routes() {

        // importacion de las rutas con la ruta a la que se deben dirigir
        this.app.use( this.usuariosPath, require('../routes/usuarios.routes'));
        
    };


    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en  =>', this.port);
        });
    };



}

module.exports = Server;
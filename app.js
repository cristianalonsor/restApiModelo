require('dotenv').config();
const Server = require('./models/server');

// creo la instancia del servidor
const server  = new Server();

// lo levanto con el metodo listen
server.listen();


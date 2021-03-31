const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        // conexion a mongo
        await mongoose.connect( process.env.MONGO_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            // para poder usar funciones que estan obsoletas
            useFindAndModify: false
        });

        console.log('BASE DE DATOS ONLINE');
        
    } catch (error) {

        throw new Error('ERROR AL INICIAR LA BASE DE DATOS');
        console.log(error);
        
    }
    
}

module.exports = {
    dbConnection
}

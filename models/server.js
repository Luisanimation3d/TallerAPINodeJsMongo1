const express = require('express');

const dbConnection = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.inmueblesPath = '/api/inmuebles';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Conectar a base de datos
        this.conectarDB();
    }

    middlewares() {
        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.inmueblesPath, require('../routes/inmuebleRoutes'));
    }

    async conectarDB() {
        await dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
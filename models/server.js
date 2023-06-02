const express = require('express');

const dbConnection = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.inmueblesPath = '/api/inmuebles';
        this.propietariosPath = '/api/propietarios';
        this.personasPath = '/api/personas';

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
        this.app.use(this.propietariosPath, require('../routes/propietarioRoutes'));
        this.app.use(this.personasPath, require('../routes/personaRoutes'));
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
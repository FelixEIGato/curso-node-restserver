const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.connectarDB();

        //Middlewares
        // Los middlewares son funciones que van añadir funcionalidades al web server
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async connectarDB(){
        await dbConnection();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        // lectura y parseo del codigo
        this.app.use( express.json() );

        //directorio público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.usuariosPath , require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }
}

module.exports = Server;
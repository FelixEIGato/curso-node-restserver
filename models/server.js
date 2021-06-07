const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:   '/api/uploads'
        }
        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';

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

        //Fileupload - Carga de Archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        
        this.app.use( this.paths.auth ,         require('../routes/auth'));
        this.app.use( this.paths.buscar ,       require('../routes/buscar'));
        this.app.use( this.paths.categorias ,   require('../routes/categorias'));
        this.app.use( this.paths.productos ,    require('../routes/productos'));
        this.app.use( this.paths.usuarios ,     require('../routes/usuarios'));
        this.app.use( this.paths.uploads ,      require('../routes/uploads'));

    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }
}

module.exports = Server;
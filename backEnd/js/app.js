var express = require('express'); 
const app = express();
const port = 3000;
app.use(express.json());


const helmet = require('helmet');
app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"}));

// permitir accesos desde el front - cors policy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
}); 

// ROUTER
const routerUsuarios = require('../js/routes/usuarios');
const routerContactos = require('../js/routes/contactos');
const routerCompanias = require('../js/routes/companias');
const routerCiu_Reg_Pais = require('../js/routes/ciu_region_pais');

app.use('/usuarios', routerUsuarios);
app.use('/contactos', routerContactos);
app.use('/companias', routerCompanias);
app.use('/ciuRegionPais', routerCiu_Reg_Pais);


/*
// ENDPOINT DE USUARIOS 
app.post('/login', routerUsuarios);
app.get('/infoUsuarios', routerUsuarios); 
app.post('/crearUsuario', routerUsuarios);
app.put('/modificarUsuario/:id', routerUsuarios);
app.delete('/eliminarUsuario/:id',routerUsuarios);

// ENDPOINT DE CONTACTOS

app.get('/infoContactos', routerContactos);  // todos los contactos 
app.get('/infoContacto/:id', routerContactos);  // un contacto por id
app.post('/agregarContacto', routerContactos);
app.put('/modificarContacto/:id', routerContactos);
app.delete('/eliminarContacto/:id',routerContactos);

//  ENDPOINTS DE COMPAÑIAS
app.get('/infoCompanias', routerCompanias);  // todos los contactos 
app.get('/infoCompania/:id', routerCompanias);  // un contacto por id
app.post('/agregarCompania', routerCompanias);
app.put('/modificarCompania/:id', routerCompanias);
app.delete('/eliminarCompania/:id',routerCompanias);*/


app.listen(port, function () {     
    console.log('El servidor express corre en el puerto ' + port);
});

let rowsR = document.getElementById("rows");
let menuUsuarios = document.getElementById("menuUsuarios");  
let region = document.getElementById("region"); 
let pais = document.getElementById("pais"); 
let ciudad = document.getElementById("ciudad"); 
let listaRegiones = document.getElementById("regionList"); // seleccionar...

let listaRegionesEdit = document.getElementById("regionListEdit");  // A EDITAR
let listaPaisesEdit = document.getElementById("paisListEdit"); 
let listaCiudadesEdit = document.getElementById("ciudadListEdit"); 


let listaPaises = document.getElementById("paisList"); 

let agregarRegion = document.getElementById("agregarRegion"); // btn +
let agregarPais = document.getElementById("agregarPais"); 
let agregarCiudad = document.getElementById("agregarCiudad"); 

let regionEdit = document.getElementById("regionEdit"); //  EDITADA
let paisEdit = document.getElementById("paisEdit"); 
let ciudadEdit = document.getElementById("ciudadEdit"); 

let modificarRegionBtnFuncion = document.getElementById('modificarRegionBtnFuncion');


let crearRegionBtn = document.getElementById("crearRegion"); // btn crear del modal
let crearPaisBtn = document.getElementById("crearPais"); 
let crearCiudadBtn = document.getElementById("crearCiudad"); 

let editarRegionBtn = document.getElementById("editarRegion"); 
let editarPaisBtn = document.getElementById("editarPais"); 
let editarCiudadBtn = document.getElementById("editarCiudad"); 


let listaRegionesElim = document.getElementById("regionListElim"); 
let eliminarRegionDefinitivamente = document.getElementById("eliminarRegionDefinitivamente");

let listaPaisesElim = document.getElementById("paisListElim"); 
let eliminarPaisDefinitivamente = document.getElementById("eliminarPaisDefinitivamente"); 

let listaCiudadesElim = document.getElementById("ciudadListElim"); 
let eliminarCiudadDefinitivamente = document.getElementById("eliminarCiudadDefinitivamente"); 


setTimeout(() => {
    $(document).ready(function () {
        $('#tablaRegiones').DataTable();
    });
}, 230);

window.onload = function () {
    if (jwt != null) {
        if (parseJwt(jwt).perfilUsuario == "Contactos") {
            removeUserPage.remove();
        } 
        fetch('http://localhost:3000/infoCiudades', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                   // console.log(e);
                    let template = `<tr><td><input type="checkbox"></td>
                                        <td>${e.nom_Region}</td>
                                        <td>${e.nom_Pais}</td>
                                        <td>${e.nom_Ciudad}</td>
                                        </tr>`;
                    rowsR.insertAdjacentHTML('beforeend', template);
                });
            });
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../index.html";
    }

    agregarRegion.addEventListener('click', () => { // BTN +
        region.value = "";
/*         editarContactoBtn.style.display = "none";
 */      /* crearRegionBtn.style.display = "initial";*/
    });
    crearRegionBtn.addEventListener('click', () => { // BTN CREAR MODAL
        agregarRegionN(jwt);
    });

    agregarPais.addEventListener('click', () => { // BTN +
        pais.value = "";
/*         editarContactoBtn.style.display = "none";
 */    /* crearPaisBtn.style.display = "initial";*/
        encontrarRegiones(jwt)
    });
    crearPaisBtn.addEventListener('click', () => { // BTN CREAR MODAL
        agregarPaisN(jwt);
    });

    agregarCiudad.addEventListener('click', () => { // BTN +
        ciudad.value = "";
/*         editarContactoBtn.style.display = "none";
 */    /* crearCiudadBtn.style.display = "initial";*/
        encontrarPaises(jwt)
    });
    crearCiudadBtn.addEventListener('click', () => { //BTN CREAR MODAL
        agregarCiudadN(jwt);
    });

};


//CREAR REGION

function agregarRegionN() {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch("http://localhost:3000/crearRegion", {
            method: 'POST',
            body: `{
                "Nombre": "${region.value}"
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 409) {
                alert("La región ya existe");
                location.href = location.href; 

            }
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data);
                    alert('Región creada');
                    location.href = location.href; 

                });
            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}


// OBTENER REGIONES 
function encontrarRegiones(jwt) {
    //listaRegionesEdit.innerHTML= "";
    fetch('http://localhost:3000/infoRegiones', { // TODAS LA REGIONES
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                console.log(e);
                let templateRegiones = `<option value=${e.id}>${e.Nombre}</option>`
                listaRegiones.insertAdjacentHTML('beforeend', templateRegiones); // seleccionar...
                listaRegionesEdit.insertAdjacentHTML('beforeend', templateRegiones);
               /* listaRegionesElim.insertAdjacentHTML('beforeend', templateRegiones);*/
               
            });
        });
    }).catch(error => {
        console.log(error);
    });
              
    
        editarRegionBtn.addEventListener('click', () => { // MODIFICAR REGION
            let region_id = listaRegionesEdit.value;
            let regionAEditar = regionEdit.value;
            modificarRegionC(region_id, regionAEditar);
        });

        

    //Eliminar
   /* eliminarRegionDefinitivamente.addEventListener('click', () => {
        let regionId = listaRegionesElim.value;
        eliminarRegionFunc(regionId);
    });*/
};




// AGREGAR PAIS
function agregarPaisN() {
   // console.log(listaRegiones.value);
    if (jwt != null) {
        fetch("http://localhost:3000/crearPais", {
            method: 'POST',
            body: `{
                "Nombre": "${pais.value}",
                "region_id": ${listaRegiones.value}
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 409) {
                alert("El País ya existe");
                location.href = location.href; 
            }
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data);
                    alert('País creado ');
                    location.href = location.href; 
                });
            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

// AGREGAR CIUDAD // TODOS LOS PAISES
function encontrarPaises(jwt) {
    fetch('http://localhost:3000/infoPaises', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
               // console.log(e);
                let templatePaises = `<option value=${e.id}>${e.Nombre}</option>`
                listaPaises.insertAdjacentHTML('beforeend', templatePaises);
                listaPaisesEdit.insertAdjacentHTML('beforeend', templatePaises);
               /* listaPaisesElim.insertAdjacentHTML('beforeend', templatePaises);*/

            });
            
        });
    }).catch(error => {
        console.log(error);
    });
    
    
        editarPaisBtn.addEventListener('click', () => {  // MODIFICAR PAIS
            let pais_id = listaPaisesEdit.value;
            let paisAEditar = paisEdit.value;
            modificarPaisC(pais_id, paisAEditar);
            
        });

    //Eliminar
  /* eliminarPaisDefinitivamente.addEventListener('click', () => {
        let paisId = listaPaisesElim.value;
        eliminarPaisFunc(paisId);
    });*/
};

// AGREGAR CIUDAD N
function agregarCiudadN() {
   // console.log(listaPaises.value);
   // console.log(ciudad.value);
    if (jwt != null) {
        fetch("http://localhost:3000/crearCiudad", {
            method: 'POST',
            body: `{
                "Nombre": "${ciudad.value}",
                "pais_id": ${listaPaises.value}
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 409) {
                alert("La ciudad ya existe");
                location.href = location.href; 

            }
            if (res.status == 200) {
                res.json().then(data => {
                   // console.log(data);
                    alert('Ciudad creada');
                    location.href = location.href; 
                });
            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

// MODIFICAR REGION
function modificarRegionC(region_id, regionAEditar) {  
    if (jwt != null) {
        fetch(`http://localhost:3000/modificarRegion/${region_id}`, {
            method: 'PUT',
            body: `{
                "Nombre": "${regionAEditar}"
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("Región Modificada");
                location.href = location.href; 

            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

// MODIFICAR PAIS
function modificarPaisC(pais_id, paisAEditar) {   
    if (jwt != null) {
        fetch(`http://localhost:3000/modificarPais/${pais_id}`, {
            method: 'PUT',
            body: `{
                "Nombre": "${paisAEditar}"
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("País modificado");
                location.href = location.href; 

            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

//OBTENER CIUDADES
function encontrarCiudad(jwt) {
    fetch('http://localhost:3000/infoCiudades', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                //console.log(e);
                let templateCiudades = `<option value=${e.id_Ciudad}>${e.nom_Ciudad}</option>`
                listaCiudadesEdit.insertAdjacentHTML('beforeend', templateCiudades);
               /* listaCiudadesElim.insertAdjacentHTML('beforeend', templateCiudades);*/

            });
        });
    }).catch(error => {
        console.log(error);
    });
    ///Editar
    editarCiudadBtn.addEventListener('click', () => {
        let ciudad_id = listaCiudadesEdit.value;
        let ciudadAEditar = ciudadEdit.value;
        editarCiudadC(ciudad_id, ciudadAEditar);
    });
    ///Eliminar
    /*eliminarCiudadDefinitivamente.addEventListener('click', () => {
        let ciudadId = listaCiudadesElim.value;
        eliminarCiudadFunc(ciudadId);
    });*/
};

//MODIFICAR CIUDAD
function editarCiudadC(ciudad_id, ciudadAEditar) {   
    if (jwt != null) {
        fetch(`http://localhost:3000/modificarCiudad/${ciudad_id}`, {
            method: 'PUT',
            body: `{
                "Nombre": "${ciudadAEditar}"
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("Ciudad Modificada");
                location.href = location.href; 

            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}


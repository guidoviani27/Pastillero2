  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Pastillero Virtual',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      
      {path: '/index/',        url: 'index.html',},

      {path: '/inicio/',        url: 'inicio.html',},

      {path: '/registro/',        url: 'registro.html',},

      {path: '/agmedic/',        url: 'agmedic.html',},

      {path: '/equipo/',        url: 'equipo.html',},

      {path: '/citamedica/',        url: 'citamedica.html',},

      {path: '/medico/',        url: 'medico.html',},

      {path: '/amigo/',        url: 'amigo.html',},

      {path: '/codigo/',        url: 'codigo.html',},

      {path: '/farmacia/',        url: 'farmacia.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');


var db = firebase.firestore();
var colUsuarios = db.collection("usuarios");
var colMedicamentos = db.collection("medicamentos");
var colCitaMedica = db.collection("citamedica");
var colMedico = db.collection("medicos")


var pastillas;
var unidad;
var duracion;
var exist;
var hora;
var lugarcita;
var horacita;
var notacita;
var diacita;
var nombremedico;
var espmedico; 
var consulmedico;
var telmedico;
var emailmedico; 
var map;
var platform;
var pos;
var latitud;
var longitud;






/* var emailito=$$('#emailLogin').val(); */
/* var email = $$('#emailLogin').val(); */








// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    platform = new H.service.Platform({
      'apikey': 'oy2ziTZV6Hjjou_gEUrdW56mWR9hGlRNK9cfcN7iwSE'
     });

      // onSuccessGPS Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccessGPS = function(position) {
      console.log('latitude: '          + position.coords.latitude          + '\n' +
            'longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');

            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
  };


  
  // onErrorGPS Callback receives a PositionError object
  //
  function onErrorGPS(error) {
    console.log('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS);
   

});







// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e + "cuando se ejecuta esto wei?");


    
  

    
})

// Option 2. Using live 'page:init' event handlers for each page


//                                                  LOGIN

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    
    console.log(e + "este es el index");

    $$('#btnLogin').on('click',function(){

      fnLogin();
      //Recuperar Nombre (sirve para otras cositas)
      
      
      
    })

    $$('#btnRegistroNuevo').on('click',function(){
      mainView.router.navigate('/registro/');
    })
    
})

//                                                  REGISTRO

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  
  console.log(e + "este es el registro");

  app.navbar.hide('#topNavbar');

  $$('#btnRegistro').on('click',function(){    
    fnRegistro();
    
  })

  $$("#volver").on('click', function() {
    console.log('click en flecha back');
    mainView.router.navigate('/index/');
  });
  
})



//                                                   INICIO

$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {

   
  console.log(e + "este es el inicio");

  app.navbar.hide('#topNavbar');



  
  $$('#btnAñadirYo').on('click',function(){
    mainView.router.navigate('/agmedic/');
  })


  $$('#btnEquipo').on('click',function(){
    mainView.router.navigate('/equipo/');
  })

  $$('#btnFarmacia').on('click',function(){
    mainView.router.navigate('/farmacia/');
  })

  
  
$$("#cerrarsesion").on('click', function(){
  fnCerrarSesion();   
})


$$("#elimino").on('click',function () {
  console.log("eliminar")
  })

  colMedicamentos.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        
        $$('#NotifiMedi').append('<div class="colornoti"> Medicamento ' + doc.data().tipomedicamento + '<br> Unidad ' + doc.data().unity + '<br> Existencia ' + doc.data().dosis + '<br><button class="col button button-fill button-round" id="'+pastillas+'"> Eliminar </button></div>');
       
        //$$('#NotiMedico').append('<div> Nombre' + doc.data().nombre + '<br> Especialidad ' + doc.data().especialidad + '<br> Consultorio' + doc.data().consultorio + '<br><button class="col button button-fill button-round" id="'+nombremedico+'"> EliminarB </button></div>');
    });    
       
    
    $$("#" + pastillas).on('click',function () {
      console.log("eliminar");
  
      colMedico.doc(pastillas).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  
      })
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });




  
})


//                                         AÑADIR MEDICACION

$$(document).on('page:init', '.page[data-name="agmedic"]', function (e) {


  console.log(e + "este es el agmedic");

  app.navbar.hide('#topNavbar');

  $$('#btnGuardarYo').on('click',function(){

    fnGuardarDatos();

    mainView.router.navigate('/inicio/');
  })

  $$("#volver").on('click', function() {
    console.log('click en flecha back');
    mainView.router.navigate('/inicio/');
  });  
  

  calendarDateTime = app.calendar.create({
    inputEl: '#demo-calendar-default',
  
    rangePicker: true,
        
    
  });

  
  var today = new Date();
   pickerInline = app.picker.create({
    containerEl: '#demo-picker-date-container',
    inputEl: '#demo-picker-date',
    toolbar: false,
    rotateEffect: true,
    value: [
      
      today.getHours(),
      today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
    ],
    formatValue: function (values, displayValues) {
      return displayValues[0] + ' ' + values[1];
    },
    cols: [      
      {
        values: (function () {
          var arr = [];
          for (var i = 0; i <= 23; i++) { arr.push(i); }
            return arr;
        })(),
      },
      // Divider
      {
        divider: true,
        content: ':'
      },
      // Minutes
      {
        values: (function () {
          var arr = [];
          for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
            return arr;
        })(),
      }
    ],
    on: {
      change: function (picker, values, displayValues) {
        var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
        if (values[1] > daysInMonth) {
          picker.cols[1].setValue(daysInMonth);
        }
      },
    }
  });

    
  
})



//                                                   EQUIPO


$$(document).on('page:init', '.page[data-name="equipo"]', function (e) {

  
  
  console.log(e + "este es el equipo");

  app.navbar.hide('#topNavbar');

  $$('#btnAñadirEquipo').on('click',function(){
    $$('#Agregar').removeAttr('hidden')
  })

  $$('#citamedica').on('click',function(){
    console.log('1');
    mainView.router.navigate('/citamedica/');

    
  })
  $$('#medico').on('click',function(){
    console.log('2');
    mainView.router.navigate('/medico/');
    
  })
  $$('#amigo').on('click',function(){
    console.log('3');
    mainView.router.navigate('/amigo/');
    
  })
  $$('#verificacion').on('click',function(){
    console.log('4')
    mainView.router.navigate('/codigo/');
    
  })




  $$('#btnInicio').on('click',function(){
    mainView.router.navigate('/inicio/');
  })

  $$('#btnFarmacia').on('click',function(){
    mainView.router.navigate('/farmacia/');
  })


  




colMedico.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        
  
        $$('#NotiMedico').append('<div class="colornoti"> Nombre' + doc.data().nombre + '<br> Especialidad ' + doc.data().especialidad + '<br> Consultorio' + doc.data().consultorio + '<br><button class="col button button-fill button-round" id="'+nombremedico+'"> EliminarB </button></div>');
    });    
       
    
    $$("#" + nombremedico).on('click',function () {
      console.log("eliminar");
  
      colMedico.doc(nombremedico).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  
      })
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
  
  
  colCitaMedica.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        
  
        $$('#NotiCita').append('<div class="colornoti"> Lugar' + doc.data().lugar + '<br> Hora' + doc.data().hora + '<br> Dia' + doc.data().dia + '<br><button class="col button button-fill button-round" id="'+notacita+'"> Eliminar </button></div>');
    });
  
       
    
    $$("#" + notacita).on('click',function () {
      console.log("eliminar");
  
      colCitaMedica.doc(notacita).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  
      })
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

})


//                                             OPCIONES EQUIPO

//                                               CITA MEDICA


  $$(document).on('page:init', '.page[data-name="citamedica"]', function (e) {
    
    console.log(e + "citamedica");
    app.navbar.hide('#topNavbar');

    $$("#volver").on('click', function() {
      console.log('click en flecha back');
      mainView.router.navigate('/equipo/');
    });

    $$("#btnACMEDICA").on('click', function() {
      console.log('añadircitamedica');

      fnCitaMedica();

      mainView.router.navigate('/equipo/');
    });

    calendarDateTime = app.calendar.create({
      inputEl: '#demo-calendar-default',                
      });
  
    
    var today = new Date();
     pickerInline = app.picker.create({
      containerEl: '#demo-picker-date-container',
      inputEl: '#demo-picker-date',
      toolbar: false,
      rotateEffect: true,
      value: [
        
        today.getHours(),
        today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
      ],
      formatValue: function (values, displayValues) {
        return displayValues[0] + ' ' + values[1];
      },
      cols: [      
        {
          values: (function () {
            var arr = [];
            for (var i = 0; i <= 23; i++) { arr.push(i); }
              return arr;
          })(),
        },
        // Divider
        {
          divider: true,
          content: ':'
        },
        // Minutes
        {
          values: (function () {
            var arr = [];
            for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
              return arr;
          })(),
        }
      ],
      on: {
        change: function (picker, values, displayValues) {
          var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
          if (values[1] > daysInMonth) {
            picker.cols[1].setValue(daysInMonth);
          }
        },
      }
    });

      
})


//                                                AGREGAR MEDICO

$$(document).on('page:init', '.page[data-name="medico"]', function (e) {
  
  console.log(e + "medico");
  app.navbar.hide('#topNavbar');

  $$("#volver").on('click', function() {
    console.log('click en flecha back');
    mainView.router.navigate('/equipo/');
  });


  $$("#btnAGMedico").on('click', function() {
    console.log('añadircitamedica');

    fnMedico();

    mainView.router.navigate('/equipo/');
  });
  
  

    
})

//                                               AGREGAR AMIGO


$$(document).on('page:init', '.page[data-name="amigo"]', function (e) {
  
  console.log(e + "amigo");
  app.navbar.hide('#topNavbar');

  $$("#volver").on('click', function() {
    console.log('click en flecha back');
    mainView.router.navigate('/equipo/');
  });

    
})

//                                               CODIGO DE VERIFICACIÓN

$$(document).on('page:init', '.page[data-name="codigo"]', function (e) {
  
  console.log(e + "codigo");
  app.navbar.hide('#topNavbar');

  $$("#volver").on('click', function() {
    console.log('click en flecha back');
    mainView.router.navigate('/equipo/');
  });

    
})


//                                                            FARMACIA

$$(document).on('page:init', '.page[data-name="farmacia"]', function (e) {
  
  console.log(e + "este es la farmacia");

  app.navbar.hide('#topNavbar');

  

  $$('#btnEquipo').on('click',function(){
    mainView.router.navigate('/equipo/');
  })

  $$('#btnInicio').on('click',function(){
    mainView.router.navigate('/inicio/');
  })


  
   
  var defaultLayers = platform.createDefaultLayers();
 
 
 
	// Instantiate (and display) a map object:
	map = new H.Map(
        document.getElementById('mapContainer'),
    	defaultLayers.vector.normal.map,
    	{
      	zoom: 14,
      	center: { lat: latitud, lng: longitud }
        });
 
    	coords = {lat: latitud, lng: longitud};
    	marker = new H.map.Marker(coords);
 
    	// Add the marker to the map and center the map at the location of the marker:
    	map.addObject(marker);
    	map.setCenter(coords);


      
    behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
 



  

 
  
})






//                                                   FUNCIONES

//                                                FUNCION REGISTRO
  function fnRegistro(){

    em=$$('#emailReg').val();
    pa=$$('#passReg').val();
    no=$$('#nombreReg').val();
    ap=$$('#apellidoReg').val();
    fn=$$('#fechaReg').val();


    firebase.auth().createUserWithEmailAndPassword(em, pa)
    .then(function(){
      //alert("registro ok");
      datos = { Nombre: no, Apellido: ap, Fecha : fn}
      colUsuarios.doc(em).set(datos);
      
      mainView.router.navigate('/index/');
    })
    .catch(function(error) {
// Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {

    alert('Clave muy débil.');
    } else {

    alert(errorMessage);

    }
    console.log(error);

}); 

  }

//                                                Funcion Login

function fnLogin(){
  var email = $$('#emailLogin').val();
  var password = $$('#passLogin').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in

    /* var emailusuario = email; */
      
      colUsuarios.doc(email).get().then((doc) => {
        if (doc.exists) {
          var NombreUsuario = doc.data().Nombre;
          console.log('documento existe');
          console.log('tipo usuario: ' + NombreUsuario);
          $$("#MensajeInicio").html("Bienvenido " + NombreUsuario);
          $$('#idOculto').html(email);
      }
      })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });

    // ...

    mainView.router.navigate('/inicio/');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + errorMessage)
    alert(errorCode + errorMessage);


    
  });
}

//                                            Funcion Cerrar Sesion
function fnCerrarSesion(){

  mainView.router.navigate('/index/');
  firebase.auth().signOut().then(() => {
    alert("Se ha cerrado la sesion")
  }).catch((error) => {
    alert(error);
  });

}


//                                            Funcion Datos Medicamentos

function fnGuardarDatos() {
  pastillas = $$("#nomMedicamento").val();
  unidad = $$("#Unidad").val();
  duracion = $$("#demo-calendar-default").val();
  exist = $$("#existencia").val();
  hora = $$("#demo-picker-date").val();
  

  var emailmedicamentos = $$('#idOculto').html();
  
  colMedicamentos.doc(pastillas).set({
    tipomedicamento : pastillas, unity: unidad, dosis: exist, email: emailmedicamentos, fecha : duracion , horapastilla : hora
})
.then(() => { 
  

    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});



  }

//                                            FUNCION GUARDAR CITA MEDICA

function fnCitaMedica(){
   lugarcita = $$('#lugar').val();
   horacita = $$('#demo-picker-date').val();
   notacita = $$('#nota').val();
   diacita = $$('#demo-calendar-default').val();


var emailmedicamentos = $$('#idOculto').html();



colCitaMedica.doc(notacita).set({
  lugar : lugarcita, hora : horacita , nota : notacita , dia : diacita , email : emailmedicamentos 
})
.then(() => { 


  console.log("Document successfully written!");
})
.catch((error) => {
  console.error("Error writing document: ", error);
});

}


//                                          FUNCION GUARDAR MEDICO


function fnMedico(){
  nombremedico = $$('#nombreMedico').val();
  espmedico = $$('#especialidad').val();
  consulmedico = $$('#consultorio').val();
  telmedico = $$('#telmedico').val();
  emailmedico = $$('#emailmedico').val();


var emailmedicamentos = $$('#idOculto').html();



colMedico.doc(nombremedico).set({
 nombre : nombremedico , especialidad : espmedico , consultorio : consulmedico , telefono : telmedico , emailmedic : emailmedico , email : emailmedicamentos
})
.then(() => { 


 console.log("Document successfully written!");

 
})
.catch((error) => {
 console.error("Error writing document: ", error);
});

}

 



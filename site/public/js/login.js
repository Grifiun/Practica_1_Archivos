var username = document.getElementById("username");
var password = document.getElementById("password");
var mensajeParragraph = document.getElementById("mensaje");

function actualizarMensaje(mensaje){	
	username.value = "";
	password.value = "";

	mensajeParragraph.innerHTML = mensaje;
}

function login(){
	try{
		$.ajax({
			type: 'GET',
			dataType: "json",
			url: 'http://localhost:4000/api/login', 
			data: {username: username.value, password: password.value},
			success: function(data){
				console.log("datos: " + data.estado);

				const resultado = data.estado;
				if(data.estado === "true"){
					// Simulate an HTTP redirect:
					window.location.replace("http://localhost:4000/");
					actualizarMensaje("Credenciales correctas");
				}else{
					actualizarMensaje("Credenciales incorrectas, revise su entrada");
				}				
			}
		});
	}catch(error){
		console.log("Error en la conexion: " + error);
	}	
}

function register(){
	try{
		$.ajax({
			type: 'GET',
			dataType: "json",
			url: 'http://localhost:4000/api/register', 
			data: {username: username.value, password: password.value},
			success: function(data){
				console.log("datos: " + data.estado);

				const resultado = data.estado;
				actualizarMensaje(data.estado);
				if(data.estado === "El usuario se registro de forma impecable"){
					// Simulate an HTTP redirect:
					window.location.replace("http://localhost:4000/");
				}			
			}
		});
	}catch(error){
		console.log("Error en la conexion: " + error);
	}	
}




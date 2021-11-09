var resultado = document.getElementById("resultado");
var historial = document.getElementById("tabla-historial");

function ingresar(auxEntrada){
	console.log(auxEntrada);
	resultado.value += auxEntrada;
}

function resolver(){
	//let resultadoCalculo = eval(resultado.value);
	//Creamos una nueva fila
	var row = historial.insertRow(-1);
	
	//Insertamos celdas
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	
	//Agregamos el tamaño de las celdas
	cell1.colSpan = 3;
	cell2.colSpan = 1;
	cell3.colSpan = 3;
	
	//Agregamos la clase css
	cell1.classList.add('text-center');
	cell2.classList.add('text-center');
	cell3.classList.add('text-center');
	cell1.classList.add('datos');
	cell2.classList.add('datos');
	cell3.classList.add('datos');
	cell1.classList.add('color-dato');
	cell2.classList.add('color-dato');
	cell3.classList.add('color-dato');
		
	//Insertamos el valor en la tabla
	cell1.innerHTML = resultado.value;
	cell2.innerHTML = "=";
	
	//Realizamos conexión ajax	
	try{
		$.ajax({
			type: 'GET',
			dataType: "json",
			//url: 'http://localhost:4000/api/servicios',
			url: 'http://localhost:4000/worker/operacion',
			data: {entrada: resultado.value},
			success: function(data){
				//Ingresamos el resultado en la tabla
				cell3.innerHTML = data.resultado;

				//Actualizamos el valor del input
				resultado.value = resultadoCalculo;
			}
		});
	}catch(error){
		console.log("Error en la conexion: " + error);
	}	
}

function cargarHistorial(){	
	console.log("cargar historial inicio");
	//Realizamos conexión ajax	
	try{
		$.ajax({
			type: 'GET',
			dataType: "json",
			//url: 'http://localhost:4000/api/servicios',
			url: 'http://localhost:4000/worker/obtenerhistorial',
			//data: {},
			success: function(data){
				console.log("cargar historial ajax callback");
				//Ingresamos el resultado en la tabla
				let arreglo = data.data;
				console.log("Arreglo: " + arreglo);
				for(i = 0; i < arreglo.length; i++){
					console.log("Arreglo: " + i + " => " +  arreglo[i]);
					ingresarCelda(arreglo[i]);
				}
				
			}
		});
	}catch(error){
		console.log("Error en la conexion: " + error);
	}	
}

function ingresarCelda(value){
	let valores = value.split('=');
	let operacionAux = valores[0];
	let resultadoAux = valores[1];

	//let resultadoCalculo = eval(resultado.value);
	//Creamos una nueva fila
	var row = historial.insertRow(-1);
	
	//Insertamos celdas
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	
	//Agregamos el tamaño de las celdas
	cell1.colSpan = 3;
	cell2.colSpan = 1;
	cell3.colSpan = 3;
	
	//Agregamos la clase css
	cell1.classList.add('text-center');
	cell2.classList.add('text-center');
	cell3.classList.add('text-center');
	cell1.classList.add('datos');
	cell2.classList.add('datos');
	cell3.classList.add('datos');
	cell1.classList.add('color-dato');
	cell2.classList.add('color-dato');
	cell3.classList.add('color-dato');
		
	//Insertamos el valor en la tabla
	cell1.innerHTML = resultadoAux;
	cell2.innerHTML = "=";
	cell3.innerHTML = resultadoAux;
}

function limpiarC(){
	resultado.value = resultado.value.slice(0, -1);
}

function limpiarX(){
	resultado.value = "";
}

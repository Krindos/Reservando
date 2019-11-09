var expect=chai.expect;
var idTest;
// Test de las funciones de Restaurante.js
describe("Test Restaurant: Reserva de horario",function(){
    it("Se crea el restaurante: Test restaurante", function(){
        var cantidadOriginal=listado.restaurantes.length;
        crearRestauranteTest();
        expect(listado.restaurantes.length).to.eql(cantidadOriginal+1);
    });
    it("Se elimina el horario reservado de la lista", function(){
        var cantidadOriginal=listado.restaurantes[idTest-1].horarios.length;
        listado.reservarUnHorario(idTest,"21:00");
        expect(listado.restaurantes[idTest-1].horarios.length).to.eql(cantidadOriginal-1);
    });
    it("La lista de horario no se modifica si se reserva un horario no disponible", function(){
        var cantidadOriginal=listado.restaurantes[idTest-1].horarios.length;
        listado.reservarUnHorario(idTest,"13:00");
        expect(listado.restaurantes[idTest-1].horarios.length).to.eql(cantidadOriginal);
    });
    it("La lista de horario no se modifica si no se pasa un horario como parametro", function(){
        var cantidadOriginal=listado.restaurantes[idTest-1].horarios.length;
        listado.reservarUnHorario(idTest);
        expect(listado.restaurantes[idTest-1].horarios.length).to.eql(cantidadOriginal);
    });
})

describe("Test Restaurant: Calificación",function(){
    it("Cuando no hay calificaciones el promedio es \"0\"", function(){
        expect( listado.restaurantes[idTest-1].obtenerPuntuacion()).to.eql(0);
    });
    it("Calificacion acepta un numero", function(){
        listado.calificarRestaurant(idTest,8);
        expect(listado.restaurantes[idTest-1].calificaciones.length).to.eql(1);
    });
    it("Calificacion no acepta string", function(){
        listado.calificarRestaurant(idTest,"10");
        expect(listado.restaurantes[idTest-1].calificaciones.length).to.eql(1);
    });
    it("Calificacion no acepta un numero con decimal", function(){
        listado.calificarRestaurant(idTest,5.5);
        expect(listado.restaurantes[idTest-1].calificaciones.length).to.eql(1);
    });
    it("Se agrega la calificación al array de calificación", function(){
        listado.calificarRestaurant(idTest,3);
        expect(listado.restaurantes[idTest-1].calificaciones.length).to.eql(2);
    });
    it("Calificacion no acepta \"0\"", function(){
        listado.calificarRestaurant(idTest,0);
        expect(listado.restaurantes[idTest-1].calificaciones.length).to.eql(2);
    });
    it("Calificacion no acepta numeros negativos", function(){
        listado.calificarRestaurant(idTest,-1);
        expect(listado.restaurantes[idTest-1].calificaciones.length).to.eql(2);
    });
    it("Calificacion no acepta numeros mayores o iguales a 10", function(){
        listado.calificarRestaurant(idTest,10);
        expect(listado.restaurantes[idTest-1].calificaciones.length).to.eql(2);
    });
    
})

describe("Test Restaurant: obtenerPuntuacion()",function(){
    it("El valor promedio calculado con las puntuaciones \"3\" y \"8\" es \"5.5\"", function(){
        expect( listado.restaurantes[idTest-1].obtenerPuntuacion()).to.eql(5.5);
    });
    it("El valor promedio se redondea hacia abajo cuando las puntuaciones son \"3\", \"8\" y \"2\" (\"4.33\")", function(){
        listado.calificarRestaurant(idTest,2);
        expect( listado.restaurantes[idTest-1].obtenerPuntuacion()).to.eql(4.3);
    });
    it("El valor promedio se redondea hacia arriba cuando las puntuaciones son \"3\", \"8\", \"2\" y \"2\" (\"3.75\")", function(){
        listado.calificarRestaurant(idTest,2);
        expect( listado.restaurantes[idTest-1].obtenerPuntuacion()).to.eql(3.8);
    });
})

//Test de las funciones de listado.js
describe("Test Listado: Buscar restaurant",function(){
    it("Se obtiene correctamente el restaurante mediante el id", function(){
        expect(listado.buscarRestaurante(idTest).nombre).to.equal(listado.restaurantes[idTest-1].nombre);
    });
    it("Se obtiene el mensaje \"No se ha encontrado ningún restaurant\" cuando el id no coincide con ningun restaurante", function(){
        expect(listado.buscarRestaurante(idTest+1)).to.eql("No se ha encontrado ningún restaurant");
    });
})

describe("Test Listado: obtenerRestaurantes()",function(){
    it("Se filtra correctamente por ciudad", function(){
        expect(listado.obtenerRestaurantes(null,"TestCiudad",null).length).to.eql(1);
    });
    it("Se filtra correctamente por rubro", function(){
        expect(listado.obtenerRestaurantes("TestRubro",null,null).length).to.eql(1);
    });
    it("Se filtra correctamente por horario", function(){
        expect(listado.obtenerRestaurantes(null,null,"25:00").length).to.eql(1);
    });  
})

// Crea un restaurante de Pruebas
function crearRestauranteTest(){
    idTest=listadoDeRestaurantes[listadoDeRestaurantes.length-1].id+1;
    listadoDeRestaurantes.push(new Restaurant(idTest, "Test restaurante", "TestRubro", "TestCiudad", ["21:00","25:00"], "../img/desayuno2.jpg", []));
    listado=new Listado(listadoDeRestaurantes);
}

/*          RESERVA         */

// Funcionalidad Reserva

describe("Test Reserva: Funcionalidades",function(){
    it("El objeto reserva existe", function(){
        var reserva= new Reserva( new Date(2019,11,6,10,00),2,100,null);
        console.log(reserva);
        expect(reserva).to.be.a('Reserva');
    });
    it("Se crea la reserva", function(){
        expect(reserva).to.exist;
    });
    it("Se calcula el precio base correctamente", function(){
        reserva=crearReserva( new Date(2019,11,6,10,00),2,100,null);
        expect(calcularPrecioBase(reserva)).to.eql(200);
    });
    it("Se calcula el precio final correctamente sin descuentos ni adicionales", function(){
        expect(calcularPrecioFinal(reserva)).to.eql(200);
    });
})

//  Descuentos

describe("Test Reserva: Descuentos grupales",function(){
    it("No se realiza descuento para grupos de menos de 4 personas (-0%)", function(){
        expect(calcularPrecioFinal(reserva)).to.eql(200);
    });
    it("Se realiza correctamente el descuento entre 4 y 6 personas (-5%)", function(){
        reserva=crearReserva( new Date(2019,11,6,10,00),4,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(380);
    });
    it("Se realiza correctamente el descuento entre 7 y 8 personas (-10%)", function(){
        reserva=crearReserva( new Date(2019,11,6,10,00),7,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(630);
    });
    it("Se realiza correctamente el descuento para mas de 8 personas (-15%)", function(){
        reserva=crearReserva( new Date(2019,11,6,10,00),9,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(765);
    });

})

describe("Test Reserva: Descuentos por código",function(){
    it("Se realiza correctamente el descuento DES15 (-15%)", function(){
        reserva=crearReserva( new Date(2019,11,6,10,00),3,100,'DES15');
        expect(calcularPrecioFinal(reserva)).to.eql(255);
    });
    it("Se realiza correctamente el descuento des200 (-$200)", function(){
        reserva=crearReserva( new Date(2019,11,6,10,00),3,100,'DES200');
        expect(calcularPrecioFinal(reserva)).to.eql(200);
    });
    it("Se realiza correctamente el descuento DES1( valor equivalente a 1 persona)", function(){
        reserva=crearReserva( new Date(2019,11,6,10,00),3,100,'DES1');
        expect(calcularPrecioFinal(reserva)).to.eql(200);
    });
})


//  Adicionales
describe("Test Reserva: Adicionales por horario",function(){
    it("Se agrega un adicional a partir de la horas 13:00 (+5%)", function(){
        reserva=crearReserva( new Date(2019,11,6,13,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(315);
    });
    it("Se agrega un adicional antes de la hora 14:00 (+5%)", function(){
        reserva=crearReserva( new Date(2019,11,6,13,59),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(315);
    });
    it("Se agrega un adicional a partir de la hora 20:00 (+5%)", function(){
        reserva=crearReserva( new Date(2019,11,6,20,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(315);
    });
    it("Se agrega un adicional antes de la hora 21:00 (+5%)", function(){
        reserva=crearReserva( new Date(2019,11,6,20,59),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(315);
    });
    it("No se agregan adicionales antes de las 13:00 (+0%)", function(){
        reserva=crearReserva( new Date(2019,11,6,12,59),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(300);
    });
    it("No se agregan adicionales despues de las 14:00 (+0%)", function(){
        reserva=crearReserva( new Date(2019,11,6,14,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(300);
    });
    it("No se agregan adicionales antes de las 20:00 (+0%)", function(){
        reserva=crearReserva( new Date(2019,11,6,19,59),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(300);
    });
    it("No se agregan adicionales despues de las 21:00 (+0%)", function(){
        reserva=crearReserva( new Date(2019,11,6,21,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(300);
    });
})

describe("Test Reserva: Adicionales por dìa de semana",function(){
    it("Se agrega un adicional para los dìas viernes (+10%)", function(){
        reserva=crearReserva( new Date(2019,11,8,10,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(330);
    });
    it("Se agrega un adicional para los dìas sabados (+10%)", function(){
        reserva=crearReserva( new Date(2019,11,9,10,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(330);
    });
    it("Se agrega un adicional para los dìas domingos (+10%)", function(){
        reserva=crearReserva( new Date(2019,11,10,10,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(330);
    });
    it("No se agrega un adicional para los dìas lunes (+0%)", function(){
        reserva=crearReserva( new Date(2019,11,11,10,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(300);
    });
    it("No se agrega un adicional para los dìas martes (+0%)", function(){
        reserva=crearReserva( new Date(2019,11,12,10,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(300);
    });
    it("No se agrega un adicional para los dìas miercoles (+0%)", function(){
        reserva=crearReserva( new Date(2019,11,13,10,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(300);
    });
    it("No se agrega un adicional para los dìas jueves (+0%)", function(){
        reserva=crearReserva( new Date(2019,11,14,10,00),3,100,null);
        expect(calcularPrecioFinal(reserva)).to.eql(300);
    });
})
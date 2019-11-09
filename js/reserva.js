// Modelado de Reserva
class Reserva {
    constructor(horario, cantidadDePersonas, precioPorPersona, codigoDescuento) {
        this.horario = horario;
        this.cantidadDePersonas = cantidadDePersonas;
        this.precioPorPersona = precioPorPersona;
        this.codigoDescuento = codigoDescuento;
        // if (horario instanceof Date){
        //     this.horario=horario;
        // } else{
        //     throw "Fecha incorrecta";
        // }
        // if (cantidadDePersonas instanceof Number){
        //     this.cantidadDePersonas=cantidadDePersonas;
        // } else{
        //     throw "Numero invalido para cantidad de personas";
        // }
        // if (precioPorPersona instanceof Number){
        //     this.precioPorPersona=precioPorPersona;
        // } else{
        //     throw "Valor incorrecto para el precio";
        // }
        // if ((codigoDescuento==='DES1')||(codigoDescuento==='DES15')||(codigoDescuento==='DES200')||(codigoDescuento===null)){
        //     this.codigoDescuento=codigoDescuento;
        // } else{
        //     throw "Codigo de descuento incorrecto";
        // }
    }
}

// Funcion para crear una reserva

function crearReserva(horario, cantidadDePersonas, precioPorPersona, codigoDescuento){
    return new Reserva(horario, cantidadDePersonas, precioPorPersona, codigoDescuento);
}

// Funcionalidad para calcular el precio base de una reserva
function calcularPrecioBase(this){
    let total=this.precioPorPersona*cantidadDePersonas;
}

//Funcionalidad que calcula el precio total de la reserva

//Descuentos: por grupo grande
//Descuentos: por codigo
//Descuentos: por DES15
//Descuentos: por DES200
//Descuentos: por DES1

//Adicionales; por horario
//Adicionales; por fin de semana


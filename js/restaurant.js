var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    return this.horarios= this.horarios.filter(horario => horario!=horarioReservado );
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);
    }
}

// REaliza la suma de todos los elementos de un array
function sumatoria(numeros){
    return numeros.reduce((acumulador,numero) => acumulador+numero);
}

// Realiza el promedio de los elementos de un array
function promedio(numeros){
    return Math.round((sumatoria(numeros)/numeros.length)*10)/10;
}
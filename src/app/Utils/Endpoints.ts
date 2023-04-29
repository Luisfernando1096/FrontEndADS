import { environment } from "src/environments/environment";

export const Endpoints = {

    // Endpoint que permite obtener todos los estudiantes
    getEstudiantes: environment.apiURL.concat('/estudiantes/obtenerListaEstudiantes'),
    // Endpoint para insertar un estudiante
    postEstudiante: environment.apiURL.concat('/estudiantes/insertarEstudiante'),
    // Endpoint para eliminar un estudiante
    deleteEstudiante: environment.apiURL.concat('/estudiantes/eliminarEstudiante/:id'),
    // Endpoint para actualizar un estudiante
    updateEstudiante: environment.apiURL.concat('/estudiantes/actualizarEstudiante/:id'),
    // Endpoint que permite obtener estudiante por ID
    getEstudiantePorID: environment.apiURL.concat('/estudiantes/obtenerEstudiante/:id'),

    // Endpoint que permite obtener todos los estudiantes
    getCarreras: environment.apiURL.concat('/carreras/obtenerListaCarreras'),
    // Endpoint para insertar un estudiante
    postCarrera: environment.apiURL.concat('/carreras/insertarCarrera'),
    // Endpoint para eliminar un estudiante
    deleteCarrera: environment.apiURL.concat('/carreras/eliminarCarrera/:id'),
    // Endpoint para actualizar un estudiante
    updateCarrera: environment.apiURL.concat('/carreras/actualizarCarrera/:id'),
    // Endpoint que permite obtener estudiante por ID
    getCarreraPorID: environment.apiURL.concat('/carreras/obtenerCarrera/:id'),

    // Endpoint que permite obtener todos los estudiantes
    getProfesores: environment.apiURL.concat('/profesores/obtenerListaProfesores'),
    // Endpoint para insertar un estudiante
    postProfesor: environment.apiURL.concat('/profesores/insertarProfesor'),
    // Endpoint para eliminar un estudiante
    deleteProfesor: environment.apiURL.concat('/profesores/eliminarProfesor/:id'),
    // Endpoint para actualizar un estudiante
    updateProfesor: environment.apiURL.concat('/profesores/actualizarProfesor/:id'),
    // Endpoint que permite obtener estudiante por ID
    getProfesorPorID: environment.apiURL.concat('/profesores/obtenerProfesor/:id'),

}
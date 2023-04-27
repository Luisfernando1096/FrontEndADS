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
    getEstudiantePorID: environment.apiURL.concat('/estudiantes/obtenerEstudiante/:id')

}
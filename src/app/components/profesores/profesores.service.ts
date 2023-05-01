import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/Utils/Endpoints";
import { Profesor } from "../models/profesores.interface";

@Injectable({
    providedIn: 'root'
})

export class ProfesoresService {

    constructor(private httpClient: HttpClient) { }

    // Obtener lista de carreras
    getListaProfesores() {
        return this.httpClient.get<any>(Endpoints.getProfesores);
    }
    // Insertar carrera
    postProfesor(profesor: Profesor) {
        // Se arma el objeto a enviar
        let body = {
            "emailProfesor": profesor.emailProfesor,
            "nombresProfesor": profesor.nombresProfesor,//deben llamarse igual a la clase en el backend
            "apellidosProfesor": profesor.apellidosProfesor
        }
        return this.httpClient.post<any>(Endpoints.postProfesor, body);
    }
    // Eliminar una carrera
    deleteProfesor(idProfesor: number) {
        return this.httpClient.delete<any>(Endpoints.deleteProfesor.replace(':id', idProfesor.toString()));
    }
    // Obtener carrera por ID
    getProfesorPorID(idProfesor: number) {
        return this.httpClient.get<Profesor>(Endpoints.getProfesorPorID.replace(':id', idProfesor.toString()));
    }
    // Actualizar carrera
    updateProfesor(idProfesor: number, profesor: Profesor) {
        // Se arma el objeto a enviar
        let body = {
            "idProfesor": profesor.idProfesor,
            "emailProfesor": profesor.emailProfesor,
            "nombresProfesor": profesor.nombresProfesor,//deben llamarse igual a la clase en el backend
            "apellidosProfesor": profesor.apellidosProfesor
        }
        return this.httpClient.patch<number>(Endpoints.updateProfesor.replace(':id', idProfesor.toString()), body);
    }
}
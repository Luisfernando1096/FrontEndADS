import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/Utils/Endpoints";
import { Carrera } from "../models/carreras.interface";

@Injectable({
    providedIn: 'root'
})

export class CarreraService {

    constructor(private httpClient: HttpClient) { }

    // Obtener lista de estudiantes
    getListaEstudiantes() {
        return this.httpClient.get<any>(Endpoints.getCarreras);
    }
    // Insertar estudiante
    postCarrera(carrera: Carrera) {
        // Se arma el objeto a enviar
        let body = {
            "codigo": carrera.codigo,
            "nombre": carrera.nombre
        }
        return this.httpClient.post<any>(Endpoints.postEstudiante, body);
    }
    // Eliminar un estudiante
    deleteEstudiante(idEstudiante: number) {
        return this.httpClient.delete<any>(Endpoints.deleteEstudiante.replace(':id', idEstudiante.toString()));
    }
    // Obtener estudiante por ID
    getEstudiantePorID(idEstudiante: number) {
        return this.httpClient.get<Carrera>(Endpoints.getCarreraPorID.replace(':id', idEstudiante.toString()));
    }
    // Actualizar estudiante
    updateEstudiante(idCarrera: number, carrera: Carrera) {
        // Se arma el objeto a enviar
        let body = {
            "id": carrera.id,
            "codigo": carrera.codigo,
            "nombre": carrera.nombre
        }
        return this.httpClient.patch<number>(Endpoints.updateEstudiante.replace(':id', idCarrera.toString()), body);
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/Utils/Endpoints";
import { Materia } from "../models/materias.interface";

@Injectable({
    providedIn: 'root'
})

export class MateriasService {

    constructor(private httpClient: HttpClient) { }

    // Obtener lista de carreras
    getListaMaterias() {
        return this.httpClient.get<any>(Endpoints.getMaterias);
    }
    // Insertar carrera
    postMateria(materia: Materia) {
        // Se arma el objeto a enviar
        let body = {
            "nombreMateria": materia.nombreMateria
        }
        return this.httpClient.post<any>(Endpoints.postMateria, body);
    }
    // Eliminar una carrera
    deleteMateria(idMateria: number) {
        return this.httpClient.delete<any>(Endpoints.deleteMateria.replace(':id', idMateria.toString()));
    }
    // Obtener carrera por ID
    getMateriaPorID(idMateria: number) {
        return this.httpClient.get<Materia>(Endpoints.getMateriaPorID.replace(':id', idMateria.toString()));
    }
    // Actualizar carrera
    updateMateria(idMateria: number, materia: Materia) {
        // Se arma el objeto a enviar
        let body = {
            "idMateria": materia.idMateria,
            "nombreMateria": materia.nombreMateria
        }
        return this.httpClient.patch<number>(Endpoints.updateMateria.replace(':id', idMateria.toString()), body);
    }
}
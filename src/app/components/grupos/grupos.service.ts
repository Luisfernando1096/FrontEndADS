import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/Utils/Endpoints";
import { Grupo } from "../models/grupos.interface";

@Injectable({
    providedIn: 'root'
})

export class GrupoService {

    constructor(private httpClient: HttpClient) { }

    // Obtener lista de Grupo
    getListaGrupos() {
        return this.httpClient.get<any>(Endpoints.getGrupos);
    }
    // Insertar Grupo
    postGrupo(grupo: Grupo) {
        // Se arma el objeto a enviar
        let body = {
            "idCarrera": grupo.idCarrera,//deben llamarse igual a la clase en el backend
            "idMateria": grupo.idMateria,
            "idProfesor": grupo.idProfesor,
            "ciclo": grupo.ciclo,
            "anio": grupo.anio
        }
        return this.httpClient.post<any>(Endpoints.postGrupo, body);
    }
    // Eliminar un grupo
    deleteGrupo(idGrupo: number) {
        return this.httpClient.delete<any>(Endpoints.deleteGrupo.replace(':id', idGrupo.toString()));
    }
    // Obtener Grupo por ID
    getGrupoPorID(idGrupo: number) {
        return this.httpClient.get<Grupo>(Endpoints.getGrupoPorID.replace(':id', idGrupo.toString()));
    }
    // Actualizar Grupo
    updateGrupo(idGrupo: number, grupo: Grupo) {
        // Se arma el objeto a enviar
        let body = {
            "idGrupo": grupo.idGrupo,
            "idCarrera": grupo.idCarrera,//deben llamarse igual a la clase en el backend
            "idMateria": grupo.idMateria,
            "idProfesor": grupo.idProfesor,
            "ciclo": grupo.ciclo,
            "anio": grupo.anio
        }
        return this.httpClient.patch<number>(Endpoints.updateGrupo.replace(':id', idGrupo.toString()), body);
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endpoints } from "src/app/Utils/Endpoints";
import { Carrera } from "../models/carreras.interface";

@Injectable({
    providedIn: 'root'
})

export class CarrerasService {

    constructor(private httpClient: HttpClient) { }

    // Obtener lista de carreras
    getListaCarreras() {
        return this.httpClient.get<any>(Endpoints.getCarreras);
    }
    // Insertar carrera
    postCarrera(carrera: Carrera) {
        // Se arma el objeto a enviar
        let body = {
            "codigoCarrera": carrera.codigoCarrera,//deben llamarse igual a la clase en el backend
            "nombreCarrera": carrera.nombreCarrera
        }
        return this.httpClient.post<any>(Endpoints.postCarrera, body);
    }
    // Eliminar una carrera
    deleteCarrera(idCarrera: number) {
        return this.httpClient.delete<any>(Endpoints.deleteCarrera.replace(':id', idCarrera.toString()));
    }
    // Obtener carrera por ID
    getCarreraPorID(idCarrera: number) {
        return this.httpClient.get<Carrera>(Endpoints.getCarreraPorID.replace(':id', idCarrera.toString()));
    }
    // Actualizar carrera
    updateCarrera(idCarrera: number, carrera: Carrera) {
        // Se arma el objeto a enviar
        let body = {
            "idCarrera": carrera.idCarrera,
            "codigoCarrera": carrera.codigoCarrera,
            "nombreCarrera": carrera.nombreCarrera
        }
        return this.httpClient.patch<number>(Endpoints.updateCarrera.replace(':id', idCarrera.toString()), body);
    }
}
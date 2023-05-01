import { Component, OnInit } from '@angular/core';
import { GrupoService } from './grupos.service';
import { Router } from '@angular/router';
import { Grupo } from '../models/grupos.interface';
import { Carrera } from '../models/carreras.interface';
import { CarrerasService } from '../carreras/carreras.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  // Arreglo para almacenar el listado de Grupo
  lstGrupos: Grupo[];
  lstCarreras: Carrera[];
  //lstMaterias: Materia[];
  //lstProfesores: Profesor[];

  constructor(private grupoService: GrupoService, private router: Router, private carrerasService: CarrerasService) {
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstGrupos = [];
    this.lstCarreras = [];
  }

  ngOnInit(): void {
    this.getAllGrupos();
    this.getAllCarreras();
  }

  // Obtener lista de carreras
  getAllCarreras() {
    this.carrerasService.getListaCarreras().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
        // Se asigna la lista al arreglo anteriormente descrito
        this.lstCarreras = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }

  // Obtener lista de grupos
  getAllGrupos() {
    this.grupoService.getListaGrupos().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
        // Se asigna la lista al arreglo anteriormente descrito
        this.lstGrupos = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }
  // Metodo que permite navegar al formulario para insertar Grupo
  navigateToForm() {
    this.router.navigate(['/agregarGrupo']);
  }
  /**
  * Metodo que permite viajar al componente para agregar una Grupo (pero en
  modo edicion).
  */
  updateGrupo(valor: number) {
    // Viajando al componente agregar Grupo
    // Primero se valida que exista un valor (es decir que sea distinto de nulo)
    if (valor) {
      // Como puede notar, ahora se anexa un valor a la redireccion. Ej./agregarGrupo/3
      this.router.navigate(['/agregarGrupo', valor]);
    }
  }
  // Eliminar una carrera metodo que utilizare en el html
  deleteGrupo(event: any) {
    this.grupoService.deleteGrupo(event.target.value).subscribe({
      // En caso exitoso
      next: (temp) => {
        // Refrescamos la lista de carreras
        this.getAllGrupos();
      },
      // En caso erroneo
      error: (err) => {
        console.log("Error al eliminar");
      }
    })
  }

}



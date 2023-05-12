import { Component, OnInit } from '@angular/core';
import { GrupoService } from './grupos.service';
import { Router } from '@angular/router';
import { Grupo } from '../models/grupos.interface';
import { Carrera } from '../models/carreras.interface';
import { CarrerasService } from '../carreras/carreras.service';
import { Profesor } from '../models/profesores.interface';
import { ProfesoresService } from '../profesores/profesores.service';
import { Materia } from '../models/materias.interface';
import { MateriasService } from '../materias/materias.service';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/Utils/Utilities';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  // Arreglo para almacenar el listado de Grupo
  lstGrupos: Grupo[];
  lstCarreras: Carrera[];
  lstMaterias: Materia[];
  lstProfesores: Profesor[];

  constructor(private grupoService: GrupoService,
    private profesoresService: ProfesoresService,
    private materiasService: MateriasService,
    private router: Router, private carrerasService: CarrerasService) {
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstGrupos = [];
    this.lstCarreras = [];
    this.lstProfesores = [];
    this.lstMaterias = [];
  }

  ngOnInit(): void {
    this.getAllGrupos();
    this.getAllCarreras();
    this.getAllProfesores();
    this.getAllMaterias();
  }

  // Obtener lista de materias
  getAllMaterias() {
    this.materiasService.getListaMaterias().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
        // Se asigna la lista al arreglo anteriormente descrito
        this.lstMaterias = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }

  // Obtener lista de profesores
  getAllProfesores() {
    this.profesoresService.getListaProfesores().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
        // Se asigna la lista al arreglo anteriormente descrito
        this.lstProfesores = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
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
    Swal.fire({
      title: "¿Quiere eliminar este registro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.grupoService.deleteGrupo(event.target.value).subscribe({
          // En caso exitoso
          next: (temp) => {
            Swal.fire("Eliminado", "Registro eliminado con exito", "success");
            // Refrescamos la lista de estudiantes
            this.getAllGrupos();
          },
          // En caso erroneo
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: parsearErroresAPI(err).toString()
            });
          }
        });
      }
    });
  }

}



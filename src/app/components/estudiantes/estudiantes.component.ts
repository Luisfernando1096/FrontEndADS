import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from './estudiantes.service';
import { Router } from '@angular/router';
import { Estudiante } from '../models/estudiantes.interface';
import { parsearErroresAPI } from 'src/app/Utils/Utilities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  // Arreglo para almacenar el listado de estudiantes
  lstEstudiantes: Estudiante[];

  constructor(private estudiantesService: EstudiantesService, private router: Router) {
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstEstudiantes = [];
  }

  ngOnInit(): void {
    this.getAllEstudiantes();
  }

  // Obtener lista de estudiantes
  getAllEstudiantes() {
    this.estudiantesService.getListaEstudiantes().subscribe({
      // Se evalua que la respuesta del endpoint sea exitosa
      next: (temp) => {
        // Se asigna la lista al arreglo anteriormente descrito
        this.lstEstudiantes = temp;
      },
      // En caso de error
      error: (err) => {
        console.log("No se pudo obtener informacion");
      }
    })
  }
  // Metodo que permite navegar al formulario para insertar estudiantes
  navigateToForm() {
    this.router.navigate(['/agregarEstudiante']);
  }
  /**
  * Metodo que permite viajar al componente para agregar un estudiante (pero en
  modo edicion).
  */
  updateEstudiante(valor: number) {
    // Viajando al componente agregar estudiante
    // Primero se valida que exista un valor (es decir que sea distinto de nulo)
    if (valor) {
      // Como puede notar, ahora se anexa un valor a la redireccion. Ej./agregarEstudiante/3
      this.router.navigate(['/agregarEstudiante', valor]);
    }
  }
  /*// Eliminar un estudiante metodo que utilizare en el html
  deleteEstudiante(event: any) {
    this.estudiantesService.deleteEstudiante(event.target.value).subscribe({
      // En caso exitoso
      next: (temp) => {
        // Refrescamos la lista de estudiantes
        this.getAllEstudiantes();
      },
      // En caso erroneo
      error: (err) => {
        console.log("Error al eliminar");
      }
    })
  }*/
  // Eliminar un estudiante
  deleteEstudiante(event: any) {
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
        this.estudiantesService.deleteEstudiante(event.target.value).subscribe({
          // En caso exitoso
          next: (temp) => {
            Swal.fire("Eliminado", "Registro eliminado con exito", "success");
            // Refrescamos la lista de estudiantes
            window.location.reload();
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

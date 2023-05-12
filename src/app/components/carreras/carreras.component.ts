import { Component, OnInit } from '@angular/core';
import { CarrerasService } from './carreras.service';
import { Router } from '@angular/router';
import { Carrera } from '../models/carreras.interface';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/Utils/Utilities';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  // Arreglo para almacenar el listado de carreras
  lstCarreras: Carrera[];

  constructor(private carrerasService: CarrerasService, private router: Router) {
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstCarreras = [];
  }

  ngOnInit(): void {
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
  // Metodo que permite navegar al formulario para insertar carreras
  navigateToForm() {
    this.router.navigate(['/agregarCarrera']);
  }
  /**
  * Metodo que permite viajar al componente para agregar una carrera (pero en
  modo edicion).
  */
  updateCarrera(valor: number) {
    // Viajando al componente agregar carrera
    // Primero se valida que exista un valor (es decir que sea distinto de nulo)
    if (valor) {
      // Como puede notar, ahora se anexa un valor a la redireccion. Ej./agregarCarrera/3
      this.router.navigate(['/agregarCarrera', valor]);
    }
  }
  // Eliminar una carrera metodo que utilizare en el html
  deleteCarrera(event: any) {
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
        this.carrerasService.deleteCarrera(event.target.value).subscribe({
          // En caso exitoso
          next: (temp) => {
            Swal.fire("Eliminado", "Registro eliminado con exito", "success");
            // Refrescamos la lista de estudiantes
            this.getAllCarreras();
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


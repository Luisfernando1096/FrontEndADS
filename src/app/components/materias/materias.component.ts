import { Component, OnInit } from '@angular/core';
import { MateriasService } from './materias.service';
import { Router } from '@angular/router';
import { Materia } from '../models/materias.interface';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  // Arreglo para almacenar el listado de carreras
  lstMaterias: Materia[];

  constructor(private materiasService: MateriasService, private router: Router) {
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstMaterias = [];
  }
  ngOnInit(): void {
    this.getAllMaterias();
  }
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
  // Metodo que permite navegar al formulario para insertar carreras
  navigateToForm() {
    this.router.navigate(['/agregarMateria']);
  }
  /**
  * Metodo que permite viajar al componente para agregar una carrera (pero en
  modo edicion).
  */
  updateMateria(valor: number) {
    // Viajando al componente agregar carrera
    // Primero se valida que exista un valor (es decir que sea distinto de nulo)
    if (valor) {
      // Como puede notar, ahora se anexa un valor a la redireccion. Ej./agregarCarrera/3
      this.router.navigate(['/agregarMateria', valor]);
    }
  }
  deleteMateria(event: any) {
    this.materiasService.deleteMateria(event.target.value).subscribe({
      // En caso exitoso
      next: (temp) => {
        // Refrescamos la lista de carreras
        this.getAllMaterias();
      },
      // En caso erroneo
      error: (err) => {
        console.log("Error al eliminar");
      }
    })
  }
}

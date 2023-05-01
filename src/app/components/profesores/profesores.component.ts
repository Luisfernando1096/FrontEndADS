import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from './profesores.service';
import { Router } from '@angular/router';
import { Profesor } from '../models/profesores.interface';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})

export class ProfesoresComponent implements OnInit {
   // Arreglo para almacenar el listado de carreras
   lstProfesores: Profesor[];

   constructor(private profesoresService: ProfesoresService, private router: Router) {
     // Es necesario inicializar el arreglo anteriormente creado
     this.lstProfesores = [];
   }

  ngOnInit(): void {
    this.getAllProfesores();
  }

   // Obtener lista de carreras
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
// Metodo que permite navegar al formulario para insertar carreras
navigateToForm() {
  this.router.navigate(['/agregarProfesor']);
}
/**
* Metodo que permite viajar al componente para agregar una carrera (pero en
modo edicion).
*/
updateProfesor(valor: number) {
  // Viajando al componente agregar carrera
  // Primero se valida que exista un valor (es decir que sea distinto de nulo)
  if (valor) {
    // Como puede notar, ahora se anexa un valor a la redireccion. Ej./agregarCarrera/3
    this.router.navigate(['/agregarProfesor', valor]);
  }
}
// Eliminar una carrera metodo que utilizare en el html
deleteProfesor(event: any) {
  this.profesoresService.deleteProfesor(event.target.value).subscribe({
    // En caso exitoso
    next: (temp) => {
      // Refrescamos la lista de carreras
      this.getAllProfesores();
    },
    // En caso erroneo
    error: (err) => {
      console.log("Error al eliminar");
    }
  })
}
}

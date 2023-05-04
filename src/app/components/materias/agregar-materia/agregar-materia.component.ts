import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Materia } from '../../models/materias.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from '../materias.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.css']
})
export class AgregarMateriaComponent implements OnInit {
  // Variable que permite manejar la subscripcion al observable de ruta.
  onRouteStart!: Subscription;
  // Variable que almacena el ID de la carrera
  idMateria!: number;

  // Creacion de una variable de tipo formgroup (permite hacer manejo del formulario)
  form!: FormGroup;
  // Creacion de objeto que se enviara a traves del endpoint
  formMateria: Materia;
  constructor(private formBuilder: FormBuilder, private materiaService: MateriasService, private router: Router,
    private activedRoute: ActivatedRoute, private location: Location) {
    // Se inicializa el objeto carrera que se enviara
    this.formMateria = {} as Materia;
  }
  ngOnInit(): void {
    // Se inicia el controlador del formulario para validar
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]]

    });
    // Se inicializa el observable de ruta
    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      // Se almacena el valor capturado en la ruta.
      this.idMateria = temp.idMateria;
    });
    // Se valida que el valor del idCarrera sea mayor a cero y distinto de nulo.
    if (this.idMateria && this.idMateria > 0) {
      // Es edicion
      // Se consulta la informacion del carrera, para rellenar el formulario
      this.materiaService.getMateriaPorID(this.idMateria).subscribe({
        next: (temp) => {
          this.formMateria = temp;
          // Se rellena la informacion del formulario
          this.form.controls['nombre'].setValue(this.formMateria.nombreMateria);
        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
  }
  onSubmit() {
    // Asignacion de valores
    this.formMateria.nombreMateria = this.form.get('nombre')?.value;
    // Se valida si la variable idCarrera contiene valor, los escenarios son:
    // 1. Si el idCarrera existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idCarrera no existe entonces se debe realizar una inserccion
    if (this.idMateria && this.idMateria > 0) {
      this.materiaService.updateMateria(this.idMateria, this.formMateria
      ).subscribe({
        // Respuesta exitosa
        next: (temp) => {
          // Navegar hacia atras
          //this.router.navigate(['']);
          this.location.back()
        },
        // En caso de error
        error: (err) => {
          console.log("Error al actualizar");
        }
      })
    } else {
      // Es inserccion
      this.materiaService.postMateria(this.formMateria).subscribe({
        // Respuesta exitosa
        next: (temp) => {
          // Navegar hacia atras
          //this.router.navigate(['']);
          this.location.back();
        },
        // En caso de error
        error: (err) => {
          console.log("Error al insertar");
        }
      })
    }
  }
    /*Funcion que permite validar los campos del formulario
    trabaja evaluando si el campo ha sido manipulado o esta vacio*/
    validateField(field: string) {
      return this.form.get(field)?.invalid && this.form.get(field)?.touched;
    }

}

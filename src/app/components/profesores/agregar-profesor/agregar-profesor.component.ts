import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profesor } from '../../models/profesores.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from '../profesores.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/Utils/Utilities';


@Component({
  selector: 'app-agregar-profesor',
  templateUrl: './agregar-profesor.component.html',
  styleUrls: ['./agregar-profesor.component.css']
})
export class AgregarProfesorComponent implements OnInit {
  // Variable que permite manejar la subscripcion al observable de ruta.
  onRouteStart!: Subscription;
  // Variable que almacena el ID de la carrera
  idProfesor!: number;
  // Creacion de una variable de tipo formgroup (permite hacer manejo del formulario)
  form!: FormGroup;
  // Creacion de objeto que se enviara a traves del endpoint
  formProfesor: Profesor;
  constructor(private formBuilder: FormBuilder, private profesorService: ProfesoresService, private router: Router,
    private activedRoute: ActivatedRoute, private location: Location) {
    // Se inicializa el objeto carrera que se enviara
    this.formProfesor = {} as Profesor;
  }

  ngOnInit(): void {
    // Se inicia el controlador del formulario para validar
    this.form = this.formBuilder.group({
      emailProfesor: ['', [Validators.required, Validators.email]],
      nombresProfesor: ['', [Validators.required]],
      apellidosProfesor: ['', [Validators.required]]
      
    });
    // Se inicializa el observable de ruta
    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      // Se almacena el valor capturado en la ruta.
      this.idProfesor= temp.idProfesor;
    });
    // Se valida que el valor del idCarrera sea mayor a cero y distinto de nulo.
    if (this.idProfesor && this.idProfesor > 0) {
      // Es edicion
      // Se consulta la informacion del carrera, para rellenar el formulario
      this.profesorService.getProfesorPorID(this.idProfesor).subscribe({
        next: (temp) => {
          this.formProfesor = temp;
          // Se rellena la informacion del formulario
          this.form.controls['emailProfesor'].setValue(this.formProfesor.emailProfesor);
          this.form.controls['nombresProfesor'].setValue(this.formProfesor.nombresProfesor);
          this.form.controls['apellidosProfesor'].setValue(this.formProfesor.apellidosProfesor);

        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
  }
  onSubmit() {
    // Asignacion de valores
    this.formProfesor.emailProfesor = this.form.get('emailProfesor')?.value;
    this.formProfesor.nombresProfesor = this.form.get('nombresProfesor')?.value;
    this.formProfesor.apellidosProfesor = this.form.get('apellidosProfesor')?.value;

       // Mostrar dialogo
       Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Guardando registro, espere por favor...'
      });
      Swal.showLoading();
   
    // Se valida si la variable idCarrera contiene valor, los escenarios son:
    // 1. Si el idCarrera existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idCarrera no existe entonces se debe realizar una inserccion
    
    if (this.idProfesor && this.idProfesor > 0) {
      this.profesorService.updateProfesor(this.idProfesor, this.formProfesor
      ).subscribe({
        // Respuesta exitosa
        next: (temp) => {
          Swal.fire("Actualizado", "Registro actualizado con exito", "success");
          // Navegar hacia atras
          //this.router.navigate(['']);
          this.location.back()
        },
        // En caso de error
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar persona',
            text: parsearErroresAPI(err).toString()
          });
        }
      })
    } else {
      // Es inserccion
      this.profesorService.postProfesor(this.formProfesor).subscribe({
        // Respuesta exitosa
        next: (temp) => {
          Swal.fire("Registrado", "Registro insertado con éxito", "success");
          // Navegar hacia atras
          //this.router.navigate(['']);
          this.location.back();
        },
        // En caso de error
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al insertar persona',
            text: parsearErroresAPI(err).toString()
          });
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carrera } from '../../models/carreras.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrerasService } from '../carreras.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { parsearErroresAPI } from 'src/app/Utils/Utilities';

@Component({
  selector: 'app-agregar-carrera',
  templateUrl: './agregar-carrera.component.html',
  styleUrls: ['./agregar-carrera.component.css']
})
export class AgregarCarreraComponent implements OnInit {

  // Variable que permite manejar la subscripcion al observable de ruta.
  onRouteStart!: Subscription;
  // Variable que almacena el ID de la carrera
  idCarrera!: number;

  // Creacion de una variable de tipo formgroup (permite hacer manejo del formulario)
  form!: FormGroup;
  // Creacion de objeto que se enviara a traves del endpoint
  formCarrera: Carrera;
  constructor(private formBuilder: FormBuilder, private carreraService: CarrerasService, private router: Router,
    private activedRoute: ActivatedRoute, private location: Location) {
    // Se inicializa el objeto carrera que se enviara
    this.formCarrera = {} as Carrera;
  }

  ngOnInit(): void {
    // Se inicia el controlador del formulario para validar
    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]]

    });
    // Se inicializa el observable de ruta
    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      // Se almacena el valor capturado en la ruta.
      this.idCarrera = temp.idCarrera;
    });
    // Se valida que el valor del idCarrera sea mayor a cero y distinto de nulo.
    if (this.idCarrera && this.idCarrera > 0) {
      // Es edicion
      // Se consulta la informacion del carrera, para rellenar el formulario
      this.carreraService.getCarreraPorID(this.idCarrera).subscribe({
        next: (temp) => {
          this.formCarrera = temp;
          // Se rellena la informacion del formulario
          this.form.controls['codigo'].setValue(this.formCarrera.codigoCarrera);
          this.form.controls['nombre'].setValue(this.formCarrera.nombreCarrera);
        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
  }
  onSubmit() {
    // Asignacion de valores
    this.formCarrera.codigoCarrera = this.form.get('codigo')?.value;
    this.formCarrera.nombreCarrera = this.form.get('nombre')?.value;
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
    if (this.idCarrera && this.idCarrera > 0) {
      this.carreraService.updateCarrera(this.idCarrera, this.formCarrera
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
            title: 'Error al insertar carrera',
            text: parsearErroresAPI(err).toString()
          });
        }
      })
    } else {
      // Es inserccion
      this.carreraService.postCarrera(this.formCarrera).subscribe({
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
            title: 'Error al insertar carrera',
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


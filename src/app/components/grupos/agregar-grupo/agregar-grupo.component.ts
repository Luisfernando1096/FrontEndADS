import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grupo } from '../../models/grupos.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoService } from '../grupos.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { CarrerasService } from '../../carreras/carreras.service';
import { ProfesoresService } from '../../profesores/profesores.service';
import { Carrera } from '../../models/carreras.interface';
import { Profesor } from '../../models/profesores.interface';
import { Materia } from '../../models/materias.interface';
import { MateriasService } from '../../materias/materias.service';
import { MateriasComponent } from '../../materias/materias.component';

@Component({
  selector: 'app-agregar-grupo',
  templateUrl: './agregar-grupo.component.html',
  styleUrls: ['./agregar-grupo.component.css']
})
export class AgregarGrupoComponent implements OnInit {

  lstProfesores: Profesor[];
  // Arreglo para almacenar el listado de carreras
  lstCarreras: Carrera[];
  lstMaterias: Materia[];
  // Variable que permite manejar la subscripcion al observable de ruta.
  onRouteStart!: Subscription;
  // Variable que almacena el ID de grupo
  idGrupo!: number;

  // Creacion de una variable de tipo formgroup (permite hacer manejo del formulario)
  form!: FormGroup;
  // Creacion de objeto que se enviara a traves del endpoint
  formGrupo: Grupo;
  constructor(private carrerasService: CarrerasService,
    private profesoresService: ProfesoresService,
    private materiasService: MateriasService, 
    private formBuilder: FormBuilder, private grupoService: GrupoService, 
    private router: Router,
    private activedRoute: ActivatedRoute, private location: Location) {
    // Se inicializa el objeto carrera que se enviara
    this.formGrupo = {} as Grupo;
    // Es necesario inicializar el arreglo anteriormente creado
    this.lstCarreras = [];
    this.lstProfesores = [];
    this.lstMaterias = [];
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

  //Obtener lista de materias 
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

  ngOnInit(): void {
    // Se inicia el controlador del formulario para validar
    this.form = this.formBuilder.group({
      carrera: ['', [Validators.required]],
      materia: ['', [Validators.required]],
      profesor: ['', [Validators.required]],
      ciclo: ['', [Validators.required]],
      anio: ['', [Validators.required]]
    });
    // Se inicializa el observable de ruta
    this.onRouteStart = this.activedRoute.params.subscribe((temp) => {
      // Se almacena el valor capturado en la ruta.
      this.idGrupo = temp.idGrupo;
    });
    // Se valida que el valor del idCarrera sea mayor a cero y distinto de nulo.
    if (this.idGrupo && this.idGrupo > 0) {
      // Es edicion
      // Se consulta la informacion del grupo, para rellenar el formulario
      this.grupoService.getGrupoPorID(this.idGrupo).subscribe({
        next: (temp) => {
          this.formGrupo = temp;
          // Se rellena la informacion del formulario
          this.form.controls['carrera'].setValue(this.formGrupo.idCarrera);
          this.form.controls['materia'].setValue(this.formGrupo.idMateria);
          this.form.controls['profesor'].setValue(this.formGrupo.idProfesor);
          this.form.controls['ciclo'].setValue(this.formGrupo.ciclo);
          this.form.controls['anio'].setValue(this.formGrupo.anio);
        },
        error: (err) => {
          console.log("Error: ", err);
        }
      });
    }
    this.getAllMaterias();
    this.getAllCarreras();
    this.getAllProfesores();
  }

  onSubmit() {
    // Asignacion de valores
    this.formGrupo.idCarrera = this.form.get('carrera')?.value;
    this.formGrupo.idMateria = this.form.get('materia')?.value;
    this.formGrupo.idProfesor = this.form.get('profesor')?.value;
    this.formGrupo.ciclo = this.form.get('ciclo')?.value;
    this.formGrupo.anio = this.form.get('anio')?.value;
    // Se valida si la variable idCarrera contiene valor, los escenarios son:
    // 1. Si el idCarrera existe y es mayor a 0 entonces se debe realizar una actualizacion de datos.
    // 2. Si el idCarrera no existe entonces se debe realizar una inserccion
    if (this.idGrupo && this.idGrupo > 0) {
      this.grupoService.updateGrupo(this.idGrupo, this.formGrupo
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
      this.grupoService.postGrupo(this.formGrupo).subscribe({
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


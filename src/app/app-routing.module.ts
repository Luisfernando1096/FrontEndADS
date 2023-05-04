import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { ComponentsComponent } from './components/components.component';
import { AgregarEstudianteComponent } from './components/estudiantes/agregar-estudiante/agregar-estudiante.component';
import { AgregarCarreraComponent } from './components/carreras/agregar-carrera/agregar-carrera.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { AgregarGrupoComponent } from './components/grupos/agregar-grupo/agregar-grupo.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { AgregarProfesorComponent } from './components/profesores/agregar-profesor/agregar-profesor.component';
import { MateriasComponent } from './components/materias/materias.component';
import { AgregarMateriaComponent } from './components/materias/agregar-materia/agregar-materia.component';

const routes: Routes = [
  { path: '', component: ComponentsComponent, pathMatch: 'full' },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'agregarEstudiante', component: AgregarEstudianteComponent },
  { path: 'agregarEstudiante/:idEstudiante', component: AgregarEstudianteComponent },
  { path: 'carreras', component: CarrerasComponent },
  { path: 'agregarCarrera', component: AgregarCarreraComponent },
  { path: 'agregarCarrera/:idCarrera', component: AgregarCarreraComponent },
  { path: 'grupos', component: GruposComponent },
  { path: 'agregarGrupo', component: AgregarGrupoComponent },
  { path: 'agregarGrupo/:idGrupo', component: AgregarGrupoComponent },
  { path: 'profesores', component: ProfesoresComponent },
  { path: 'agregarProfesor', component: AgregarProfesorComponent },
  { path: 'agregarProfesor/:idProfesor', component: AgregarProfesorComponent },

  { path: 'materias', component: MateriasComponent },
  { path: 'agregarMateria', component: AgregarMateriaComponent },
  { path: 'agregarMateria/:idMateria', component: AgregarMateriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarEstudianteComponent } from './components/estudiantes/agregar-estudiante/agregar-estudiante.component';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { AgregarCarreraComponent } from './components/carreras/agregar-carrera/agregar-carrera.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { AgregarProfesorComponent } from './components/profesores/agregar-profesor/agregar-profesor.component';
import { MateriasComponent } from './components/materias/materias.component';
import { AgregarMateriaComponent } from './components/materias/agregar-materia/agregar-materia.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    EstudiantesComponent,
    AgregarEstudianteComponent,
    CarrerasComponent,
    AgregarCarreraComponent,
    ProfesoresComponent,
    AgregarProfesorComponent,
    MateriasComponent,
    AgregarMateriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

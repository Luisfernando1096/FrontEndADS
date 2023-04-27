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

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    EstudiantesComponent,
    AgregarEstudianteComponent,
    CarrerasComponent,
    AgregarCarreraComponent
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

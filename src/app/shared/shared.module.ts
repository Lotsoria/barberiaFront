import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AgendarComponent } from './components/agendar/agendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionarClientesComponent } from './components/gestionar-clientes/gestionar-clientes.component';
import { GestionarServiciosComponent } from './components/gestionar-servicios/gestionar-servicios.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { GestionarCitasComponent } from './components/gestionar-citas/gestionar-citas.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    RegistrarComponent,
    AgendarComponent,
    GestionarClientesComponent,
    GestionarServiciosComponent,
    SideBarComponent,
    GestionarCitasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    RegistrarComponent,
    AgendarComponent,
    GestionarClientesComponent,
    GestionarServiciosComponent,
    SideBarComponent
  ]	
})
export class SharedModule { }

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
import { UpdateServiciosModalComponent } from './modals/update-servicios-modal/update-servicios-modal.component';
import { UpdateClientesModalComponent } from './modals/update-clientes-modal/update-clientes-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    RegistrarComponent,
    AgendarComponent,
    GestionarClientesComponent,
    GestionarServiciosComponent,
    SideBarComponent,
    GestionarCitasComponent,
    UpdateServiciosModalComponent,
    UpdateClientesModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    AngularMaterialModule

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

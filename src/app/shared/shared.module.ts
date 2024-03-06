import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AgendarComponent } from './components/agendar/agendar.component';
import { GestionarComponent } from './components/gestionar/gestionar.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    RegistrarComponent,
    AgendarComponent,
    GestionarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    RegistrarComponent,
    AgendarComponent,
    GestionarComponent
  ]	
})
export class SharedModule { }

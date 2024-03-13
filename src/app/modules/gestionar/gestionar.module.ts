import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarRoutingModule } from './gestionar-routing.module';
import { GestionarComponent } from './pages/gestionar/gestionar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GestionarComponent
  ],
  imports: [
    CommonModule,
    GestionarRoutingModule,
    SharedModule
  ]
})
export class GestionarModule { }

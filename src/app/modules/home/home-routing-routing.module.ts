import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarComponent } from 'src/app/shared/components/agendar/agendar.component';
import { GestionarComponent } from 'src/app/shared/components/gestionar/gestionar.component';
import { RegistrarComponent } from 'src/app/shared/components/registrar/registrar.component';

const routes: Routes = [
  {
    path: 'agendar',
    component: AgendarComponent,
  },
  {
    path: 'gestionar',
    component: GestionarComponent
  },
  {
    path: 'registrar',
    component: RegistrarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingRoutingModule {}

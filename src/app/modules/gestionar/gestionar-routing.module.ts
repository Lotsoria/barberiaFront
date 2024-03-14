import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarClientesComponent } from 'src/app/shared/components/gestionar-clientes/gestionar-clientes.component';
import { GestionarServiciosComponent } from 'src/app/shared/components/gestionar-servicios/gestionar-servicios.component';
import { GestionarCitasComponent } from 'src/app/shared/components/gestionar-citas/gestionar-citas.component';

const routes: Routes = [

  {
    path: 'clientes',
    component: GestionarClientesComponent,

  },
  {
    path: 'servicios',
    component: GestionarServiciosComponent,
  },
  {
    path: 'citas',
    component: GestionarCitasComponent,
  },
  {
    path: '**',
    redirectTo: 'clientes',
    pathMatch: 'full'
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionarRoutingModule {}

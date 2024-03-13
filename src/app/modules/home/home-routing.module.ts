import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarComponent } from 'src/app/shared/components/agendar/agendar.component';
import { RegistrarComponent } from 'src/app/shared/components/registrar/registrar.component';
import { GestionarComponent } from '../gestionar/pages/gestionar/gestionar.component';

const routes: Routes = [
  {
    path: 'registrar',
    component: RegistrarComponent,

  },
  {
    path: 'agendar',
    component: AgendarComponent
  },
  {
    path: 'gestionar',
    component: GestionarComponent,
    loadChildren: () => import('../gestionar/gestionar.module').then(m => m.GestionarModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

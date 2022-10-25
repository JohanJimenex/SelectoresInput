import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesComponent } from './components/paises.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'selector',
        component: PaisesComponent
      },
      {
        path: '**',
        redirectTo: 'selector'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarBrandComponent } from './car-brand/car-brand.component';

const routes: Routes = [
  {
    path: '',
    component: CarBrandComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

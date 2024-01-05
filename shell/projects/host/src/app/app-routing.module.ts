import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('gallery/homeModule').then((module) => module.HomeModule),
      outlet: 'gallery-outlet'
  },
  {
    path: 'products',
    loadChildren: () =>
      import('products/homeModule').then((module) => module.HomeModule),
      outlet: 'product-outlet'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

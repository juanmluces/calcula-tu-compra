import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
  { path: 'inicio', component: InicioComponent, data: { animation: 'inicio' } },
  { path: 'categorias', component: CategoriasComponent, data: { animation: 'categoria' } },
  { path: 'productos', component: ProductsComponent, data: { animation: 'products' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

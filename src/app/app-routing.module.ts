import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ConfigListaComponent } from './components/config-lista/config-lista.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
  { path: 'inicio', component: InicioComponent, data: { animation: 'inicio' } },
  { path: 'categorias', component: CategoriasComponent, data: { animation: 'categoria' } },
  { path: 'productos', component: ProductsComponent, data: { animation: 'products' } },
  { path: 'config-lista', component: ConfigListaComponent, data: { animation: 'configLista' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

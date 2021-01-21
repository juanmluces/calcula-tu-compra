import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ConfigListaComponent } from './components/config-lista/config-lista.component';
import { ConocemeComponent } from './components/conoceme/conoceme.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MiListaComponent } from './components/mi-lista/mi-lista.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: 'inicio', component: InicioComponent,
    data: { animation: 'inicio' }
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    data: { animation: 'categoria' },
  },
  {
    path: 'productos',
    component: ProductsComponent,
    data: { animation: 'products' },
  },
  {
    path: 'config-lista',
    component: ConfigListaComponent,
    data: { animation: 'configLista' },
  },
  {
    path: 'mi-lista',
    component: MiListaComponent,
    data: { animation: 'miLista' },
    canActivate: [LoginGuard],
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { animation: 'perfil' },
    canActivate: [LoginGuard],
  },
  {
    path: 'conoceme',
    component: ConocemeComponent,
    data: { animation: 'conoceme' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

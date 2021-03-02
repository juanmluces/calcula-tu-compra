import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { InicioComponent } from './components/inicio/inicio.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductsComponent } from './components/products/products.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { ConfigListaComponent } from './components/config-lista/config-lista.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MiListaComponent } from './components/mi-lista/mi-lista.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ChartModule } from 'primeng/chart';
import { ConocemeComponent } from './components/conoceme/conoceme.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CategoriasComponent,
    ProductsComponent,
    ScrollToTopComponent,
    ConfigListaComponent,
    MiListaComponent,
    PerfilComponent,
    ConocemeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    NgbModule,
    ChartModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

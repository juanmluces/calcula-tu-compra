import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { InicioComponent } from './components/inicio/inicio.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductsComponent } from './products/products.component';
import { PerfectScrollbarModule, } from 'ngx-perfect-scrollbar';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { ConfigListaComponent } from './components/config-lista/config-lista.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CategoriasComponent,
    ProductsComponent,
    ScrollToTopComponent,
    ConfigListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
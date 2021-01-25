import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ListasService } from 'src/app/services/listas.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-mi-lista',
  templateUrl: './mi-lista.component.html',
  styleUrls: ['./mi-lista.component.css']
})
export class MiListaComponent implements OnInit {

  nombreLista: string;
  productsInList: Product[];
  total: number;
  list: any;

  constructor(
    private navbarServices: NavbarService,
    private listasService: ListasService
  ) {
    this.navbarServices.showNavbar(true)
    this.nombreLista = 'No hay lista guardada'
  }

  async ngOnInit() {

    this.list = await this.listasService.getLastList();
    this.productsInList = this.list.products
    this.nombreLista = this.list.titulo
    this.total = this.listasService.calculateTotal(this.productsInList)
  }


  onCheck($event) {
    $event.target.classList.toggle('slected-check')
    $event.target.parentNode.firstChild.classList.toggle("super-line")
    $event.target.parentNode.classList.toggle("selected-item")
  }

}

import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/animations/animations';
import { NavbarService } from 'src/app/services/navbar.service';

import {
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  animations: [fade],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class CategoriasComponent implements OnInit {
  categoryImage: string;
  categories: string[];
  state: string;
  config: PerfectScrollbarConfigInterface = {};

  constructor(private navbarService: NavbarService) {

    this.categoryImage = '../../../assets/images/todos.jpg';
    this.categories = ['Todos los productos', 'Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5', 'Categoria 6', 'Categoria 7', 'Categoria 8', 'Categoria 9', 'Categoria 10', 'Categoria 11', 'Categoria 12',];
    this.state = 'in'

    this.navbarService.showNavbar(true);
  }

  ngOnInit(): void {

  }

  changeImage() {
    if (this.state === 'in') {
      this.state = 'out';
      setTimeout(() => {
        if (this.categoryImage === '../../../assets/images/todos.jpg') {
          this.categoryImage = '../../../assets/images/bebidas.jpg'
        } else {
          this.categoryImage = '../../../assets/images/todos.jpg'
        }
        this.state = 'in';
      }, 300);
    }
  }

}

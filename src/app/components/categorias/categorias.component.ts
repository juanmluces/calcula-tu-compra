import { Component, OnInit } from '@angular/core';
import { fade, ngIfAnimate } from 'src/app/animations/animations';
import { NavbarService } from 'src/app/services/navbar.service';

import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { ProductsService } from 'src/app/services/products.service';
import { LoaderService } from 'src/app/services/loader.service';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  animations: [fade, ngIfAnimate],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class CategoriasComponent implements OnInit {
  categoryImage: string;
  categories: any[];
  state: string;
  config: PerfectScrollbarConfigInterface = {};

  constructor(
    private navbarService: NavbarService,
    private productsService: ProductsService,
    private loadigService: LoaderService
  ) {

    this.categoryImage = '../../../assets/images/todos.jpg';
    this.categories = []
    this.state = 'in'

    this.navbarService.showNavbar(true);
  }

  async ngOnInit() {

    this.loadigService.loadingTrue()
    this.categories = await this.productsService.getAllCategories();
    this.loadigService.loadingFalse()

  }

  changeImage(pImageSrc = '../../../assets/images/todos.jpg') {
    if (pImageSrc != this.categoryImage) {
      this.state = 'out';
      setTimeout(() => {
        this.categoryImage = pImageSrc
        this.state = 'in';
      }, 150);
    }
  }

  selectCategory(pId) {
    this.productsService.selectCategory(pId);
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../interfaces/product';
import { ngIfAnimate } from '../../animations/animations';
import { ListasService } from 'src/app/services/listas.service';
import { ProductsService } from 'src/app/services/products.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [ngIfAnimate],
})
export class ProductsComponent implements OnInit {
  faSearch = faSearch;
  searchText: string;
  category: any;
  productsToShow: Product[];
  productsInList: Product[];
  scrollPosition: number;
  itemsize = 250;
  @ViewChild('productsContainer', { read: ElementRef }) public panel: ElementRef<any>;
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;


  constructor(
    private navbarService: NavbarService,
    private listasService: ListasService,
    private productsService: ProductsService
  ) {

    this.productsInList = this.listasService.getNewList();
    this.navbarService.showNavbar(true);

  }

  async ngOnInit() {
    this.category = await this.productsService.getSelectedCategory();
    if (!this.category) {
      this.category = { name: 'todos los productos' }
    }

    this.productsToShow = await this.productsService.getAllProducts();

    this.productsInList.forEach(product => {
      this.productsToShow.find(producto => {
        if (producto.id === product.id) {
          producto.cantidad = product.cantidad
        }
      });
    })
  }

  onScroll($event) {
    this.scrollPosition = $event.target.scrollTop;
    // console.log(this.scrollPosition)
  }

  scrollTop() {
    this.panel.nativeElement.scrollTop = 0;
    this.virtualScroll.scrollToOffset(0);
    // console.log(this.virtualScroll.measureScrollOffset('top'))
  }

  async search() {
    this.virtualScroll.scrollToOffset(0);
    if (this.searchText) {
      this.productsToShow = await this.productsService.getProductsContainName(this.searchText);
    } else {
      this.ngOnInit()
    }
  }

  addProduct(pProduct) {
    this.listasService.addProductToList(pProduct);
    this.productsInList.forEach(product => {
      this.productsToShow.find(producto => {
        if (producto.id === product.id) {
          producto.cantidad = product.cantidad
        }
      });
    })
  }

}

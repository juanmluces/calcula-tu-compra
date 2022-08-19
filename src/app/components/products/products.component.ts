import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../interfaces/product';
import { ngIfAnimate } from '../../animations/animations';
import { ListasService } from 'src/app/services/listas.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsObject } from 'src/app/interfaces/ProductsObject';
import { DOCUMENT } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';




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
  productsToShow: ProductsObject;
  productsInList: Product[];
  maxPages: any;
  scrollPosition: number;
  page: number;
  reachedBottom: boolean;
  windowScrolled: boolean;

  @ViewChild('viewport', { read: ElementRef }) public panel: ElementRef<any>;



  constructor(
    private navbarService: NavbarService,
    private listasService: ListasService,
    private productsService: ProductsService,
    private loaderService: LoaderService,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.productsInList = this.listasService.getNewList();
    this.navbarService.showNavbar(true);
    this.page = 1;
    this.productsToShow = { products: [], maxPages: 0 }
    this.scrollPosition = 1;

  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  async ngOnInit() {
    this.loaderService.loadingTrue()
    this.category = await this.productsService.getSelectedCategory();
    this.loaderService.loadingFalse()
    if (!this.category) {
      this.category = { name: 'todos los productos' }
      this.loaderService.loadingTrue()
      this.productsToShow = await this.productsService.getAllProductsByPage(this.page);
      this.loaderService.loadingFalse()
    } else {
      this.loaderService.loadingTrue()
      this.productsToShow = await this.productsService.getAllProductsByCategoryByPage(this.page);
      this.loaderService.loadingFalse()
    }

    this.maxPages = (this.productsToShow.maxPages);
    this.selectedProductsBadges()
    this.checkEmptyImages()
  }

  checkEmptyImages() {
    this.productsToShow.products.forEach(product => {
      if (!product.imagen) {
        product.imagen = "assets/svg/placeholder.svg"
      }
    })
  }


  selectedProductsBadges() {
    this.productsInList.forEach(product => {
      this.productsToShow.products.find(producto => {
        if (producto.id === product.id) {
          producto.cantidad = product.cantidad
        }
      });
    })
  }

  onScroll($event) {
    this.scrollPosition = $event.target.scrollTop;
    if ($event.target.offsetHeight + $event.target.scrollTop >= $event.target.scrollHeight) {
      this.reachedBottom = true;
    } else {
      this.reachedBottom = false;
    }
  }


  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  async search() {
    this.scrollToTop()
    this.page = 1;
    if (this.searchText) {
      this.productsToShow = await this.productsService.getProductsContainNameByPage(this.searchText, this.page);
      this.maxPages = this.productsToShow.maxPages
      this.selectedProductsBadges()
      this.checkEmptyImages()
    } else {
      this.ngOnInit()
    }
  }

  async changePage($event) {
    const newPage = $event;
    this.scrollToTop()
    if (this.searchText) {
      this.loaderService.loadingTrue()
      this.productsToShow = await this.productsService.getProductsContainNameByPage(this.searchText, newPage);
      this.loaderService.loadingFalse()
      this.selectedProductsBadges()
      this.checkEmptyImages()
    } else {
      if (!this.category.id) {
        this.loaderService.loadingTrue()
        this.productsToShow = await this.productsService.getAllProductsByPage(newPage);
        this.loaderService.loadingFalse()
        this.selectedProductsBadges()
        this.checkEmptyImages()
      } else {
        this.loaderService.loadingTrue()
        this.productsToShow = await this.productsService.getAllProductsByCategoryByPage(newPage);
        this.loaderService.loadingFalse()
        this.selectedProductsBadges()
        this.checkEmptyImages()

      }
    }
  }


  addProduct(pProduct) {
    this.listasService.showStarIcon(false)
    this.listasService.addProductToList(pProduct);
    this.productsInList.forEach(product => {
      this.productsToShow.products.find(producto => {
        if (producto.id === product.id) {
          producto.cantidad = product.cantidad
        }
      });
    })
  }

}

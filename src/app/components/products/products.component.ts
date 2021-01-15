import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../interfaces/product';
import { ngIfAnimate } from '../../animations/animations';
import { ListasService } from 'src/app/services/listas.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [ngIfAnimate],
})
export class ProductsComponent implements OnInit {
  faSearch = faSearch;
  searchText: string;
  category: string;
  products: Product[];
  productsInList: Product[];
  scrollPosition: number;
  @ViewChild('productsContainer', { read: ElementRef }) public panel: ElementRef<any>;


  constructor(
    private navbarService: NavbarService,
    private listasService: ListasService
  ) {

    this.productsInList = this.listasService.getNewList();
    this.navbarService.showNavbar(true)
    this.category = "Todos los productos"
    /* Placeholder array */
    this.products = [{
      "id": 1,
      "marca": "Hacendado",
      "nombre": "Bacon taquitos",
      "imagen": "https://a2.soysuper.com/2ead27424e55902df72c266ab9b47629.340.340.0.min.wmark.796266d1.jpg",
      "precio": 1.95,
      "descripcion": "Pack 2 x 125 g - 250 g",
      "fk_categoria": 5
    },
    {
      "id": 2,
      "marca": "Hacendado",
      "nombre": "Fuet espetec extra",
      "imagen": "https://a1.soysuper.com/1fb3977901e45a47c482ec3fbe69a541.340.340.0.min.wmark.06f2f5fb.jpg",
      "precio": 2.05,
      "descripcion": "Pieza 240 g",
      "fk_categoria": 5
    },
    {
      "id": 3,
      "marca": "Hacendado",
      "nombre": "Queso rallado hilos pizza (mozzarella)",
      "imagen": "https://a1.soysuper.com/dd7d2add51ede354c96c245e15a446cc.340.340.0.min.wmark.cbec57f5.jpg",
      "precio": 1.20,
      "descripcion": "Paquete 200 g",
      "fk_categoria": 5
    },
    {
      "id": 4,
      "marca": "Hacendado",
      "nombre": "Queso rallado hilos 4 variedades (emental-cheddar-gouda-curado) fundir y gratinar",
      "imagen": "https://a1.soysuper.com/1187328ec5916cda6c96e6faedbb3379.340.340.0.min.wmark.0b7441ac.jpg",
      "precio": 1.59,
      "descripcion": "Paquete 180 g",
      "fk_categoria": 5
    },
    {
      "id": 5,
      "marca": "Hacendado",
      "nombre": "Jamon cocido extra lonchas finas",
      "imagen": "https://a2.soysuper.com/038ae6dfadb153139dd66b8708c378da.340.340.0.min.wmark.e3d156d1.jpg",
      "precio": 2.99,
      "descripcion": "Pack 2 x 225 g - 450 g",
      "fk_categoria": 5
    },
    {
      "id": 6,
      "marca": "Hacendado",
      "nombre": "Salchicha frankfurt 7 U",
      "imagen": "https://a1.soysuper.com/12bea20d1ec4853f9dc8a2520d3b5ff1.340.340.0.min.wmark.e6f4e4a4.jpg",
      "precio": 1.45,
      "descripcion": "Paquete pack 4 x 176 g - 704 g",
      "fk_categoria": 5
    },
    {
      "id": 7,
      "marca": "Hacendado",
      "nombre": "Queso barra havarti en lonchas",
      "imagen": "https://a1.soysuper.com/6a6ec66010bffc367ff210fe96118fc4.340.340.0.min.wmark.4d45f188.jpg",
      "precio": 2.50,
      "descripcion": "Paquete 300 g",
      "fk_categoria": 5
    },
    {
      "id": 8,
      "marca": "Hacendado",
      "nombre": "Fiambre pechuga pavo lonchas finas",
      "imagen": "https://a2.soysuper.com/22e978f4243d214753fa3ba11b830c03.340.340.0.min.wmark.967fe2fa.jpg",
      "precio": 2.89,
      "descripcion": "Paquete pack 2 x 200 g - 400 g",
      "fk_categoria": 5
    },
    {
      "id": 9,
      "marca": "Hacendado",
      "nombre": "Guacamole",
      "imagen": "https://a2.soysuper.com/676056e8b4966db2c231e89ce25c4e11.340.340.0.min.wmark.3315f91d.jpg",
      "precio": 1.59,
      "descripcion": "Tarrina 200 g",
      "fk_categoria": 5
    },]


  }

  ngOnInit(): void {

    this.productsInList.forEach(product => {
      this.products.find(producto => {
        if (producto.id === product.id) {
          producto.cantidad = product.cantidad
        }
      });
    })
  }

  onScroll($event) {
    this.scrollPosition = $event.target.scrollTop;
  }

  scrollTop() {
    this.panel.nativeElement.scrollTop = 0;
  }

  search() {
    console.log(this.searchText)
  }

  addProduct(pProduct) {
    this.listasService.addProductToList(pProduct)
  }
}

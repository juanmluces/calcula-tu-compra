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

  constructor(
    private navbarServices: NavbarService,
    private listasService: ListasService
  ) {

    this.navbarServices.showNavbar(true)

    /* demo List */
    this.nombreLista = 'Mi Lista Demo'
    this.productsInList = [{
      "id": 1,
      "marca": "Hacendado",
      "nombre": "Bacon taquitos",
      "imagen": "https://a2.soysuper.com/2ead27424e55902df72c266ab9b47629.340.340.0.min.wmark.796266d1.jpg",
      "precio": 1.95,
      "descripcion": "Pack 2 x 125 g - 250 g",
      "fk_categoria": 5,
      "cantidad": 1
    },
    {
      "id": 2,
      "marca": "Hacendado",
      "nombre": "Fuet espetec extra",
      "imagen": "https://a1.soysuper.com/1fb3977901e45a47c482ec3fbe69a541.340.340.0.min.wmark.06f2f5fb.jpg",
      "precio": 2.05,
      "descripcion": "Pieza 240 g",
      "fk_categoria": 5,
      "cantidad": 1
    },
    {
      "id": 3,
      "marca": "Hacendado",
      "nombre": "Queso rallado hilos pizza (mozzarella)",
      "imagen": "https://a1.soysuper.com/dd7d2add51ede354c96c245e15a446cc.340.340.0.min.wmark.cbec57f5.jpg",
      "precio": 1.20,
      "descripcion": "Paquete 200 g",
      "fk_categoria": 5,
      "cantidad": 1
    },
    {
      "id": 4,
      "marca": "Hacendado",
      "nombre": "Queso rallado hilos 4 variedades (emental-cheddar-gouda-curado) fundir y gratinar",
      "imagen": "https://a1.soysuper.com/1187328ec5916cda6c96e6faedbb3379.340.340.0.min.wmark.0b7441ac.jpg",
      "precio": 1.59,
      "descripcion": "Paquete 180 g",
      "fk_categoria": 5,
      "cantidad": 1
    },
    {
      "id": 5,
      "marca": "Hacendado",
      "nombre": "Jamon cocido extra lonchas finas",
      "imagen": "https://a2.soysuper.com/038ae6dfadb153139dd66b8708c378da.340.340.0.min.wmark.e3d156d1.jpg",
      "precio": 2.99,
      "descripcion": "Pack 2 x 225 g - 450 g",
      "fk_categoria": 5,
      "cantidad": 1
    },
    {
      "id": 6,
      "marca": "Hacendado",
      "nombre": "Salchicha frankfurt 7 U",
      "imagen": "https://a1.soysuper.com/12bea20d1ec4853f9dc8a2520d3b5ff1.340.340.0.min.wmark.e6f4e4a4.jpg",
      "precio": 1.45,
      "descripcion": "Paquete pack 4 x 176 g - 704 g",
      "fk_categoria": 5,
      "cantidad": 1
    },
    {
      "id": 7,
      "marca": "Hacendado",
      "nombre": "Queso barra havarti en lonchas",
      "imagen": "https://a1.soysuper.com/6a6ec66010bffc367ff210fe96118fc4.340.340.0.min.wmark.4d45f188.jpg",
      "precio": 2.50,
      "descripcion": "Paquete 300 g",
      "fk_categoria": 5,
      "cantidad": 1
    },
    {
      "id": 8,
      "marca": "Hacendado",
      "nombre": "Fiambre pechuga pavo lonchas finas",
      "imagen": "https://a2.soysuper.com/22e978f4243d214753fa3ba11b830c03.340.340.0.min.wmark.967fe2fa.jpg",
      "precio": 2.89,
      "descripcion": "Paquete pack 2 x 200 g - 400 g",
      "fk_categoria": 5,
      "cantidad": 1
    },
    {
      "id": 9,
      "marca": "Hacendado",
      "nombre": "Guacamole",
      "imagen": "https://a2.soysuper.com/676056e8b4966db2c231e89ce25c4e11.340.340.0.min.wmark.3315f91d.jpg",
      "precio": 1.59,
      "descripcion": "Tarrina 200 g",
      "fk_categoria": 5,
      "cantidad": 1
    },];

    /* /demo list */

  }

  ngOnInit(): void {

    this.total = this.listasService.calculateTotal(this.productsInList)
  }


  onCheck($event) {
    $event.target.classList.toggle('slected-check')
    $event.target.parentNode.firstChild.classList.toggle("super-line")
    $event.target.parentNode.classList.toggle("selected-item")
  }

}

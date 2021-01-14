import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { faTrashAlt, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Product } from 'src/app/interfaces/product';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { bootstrapAnimateAlert } from '../../animations/animations'

@Component({
  selector: 'app-config-lista',
  templateUrl: './config-lista.component.html',
  styleUrls: ['./config-lista.component.css'],
  animations: [bootstrapAnimateAlert]
})
export class ConfigListaComponent implements OnInit {
  private _success = new Subject<string>();

  // staticAlertClosed = false;
  successMessage = '';
  // @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;


  faTrashAlt = faTrashAlt;
  faMinus = faMinus;
  productsInList: Product[];
  total: number;
  presupuesto: number;
  nombreLista: string;


  constructor(private navbarService: NavbarService) {
    this.navbarService.showNavbar(true)
    this.productsInList = [{
      "id": 1,
      "marca": "Hacendado",
      "nombre": "Chocolate con leche classic",
      "imagen": "https://a0.soysuper.com/820ff267609e6c13d29f2b616224d6c9.340.340.0.min.wmark.e4cd51b3.jpg",
      "precio": 0.65,
      "descripcion": "Tableta 150 g",
      "fk_categoria": 7,
      "cantidad": 3
    },
    {
      "id": 2,
      "marca": "Hacendado",
      "nombre": "Chocolate blanco",
      "imagen": "https://a2.soysuper.com/77d99edf8c01974643d37c693af71cf2.340.340.0.min.wmark.164c0ec0.jpg",
      "precio": 0.61,
      "descripcion": "Tableta 100 g",
      "fk_categoria": 7,
      "cantidad": 1
    },
    {
      "id": 3,
      "marca": "Hacendado",
      "nombre": "Chocolate negro intenso (85% cacao)",
      "imagen": "https://a2.soysuper.com/14434a2a7c9243954a8fd09be44c4b43.340.340.0.min.wmark.9c90b546.jpg",
      "precio": 1.05,
      "descripcion": "Tableta 100 g",
      "fk_categoria": 7,
      "cantidad": 1
    },
    {
      "id": 4,
      "marca": "Hacendado",
      "nombre": "Chocolatina barrita con leche",
      "imagen": "https://a0.soysuper.com/4492fa74b7d30d39d2a973382f6e6fa1.340.340.0.min.wmark.67c74855.jpg",
      "precio": 1.58,
      "descripcion": "Paquete 200 g",
      "fk_categoria": 7,
      "cantidad": 2,
    },
    {
      "id": 5,
      "marca": "Hacendado",
      "nombre": "Turrón de chocolate crujiente",
      "imagen": "https://a2.soysuper.com/3611dbe9b7d12082e0373a51edb5f7cc.340.340.0.min.wmark.c24bee27.jpg",
      "precio": 1,
      "descripcion": "Pastilla 250 g",
      "fk_categoria": 7,
      "cantidad": 1
    },
    {
      "id": 6,
      "marca": "Hacendado",
      "nombre": "Chocolate negro (72 % cacao)",
      "imagen": "https://a0.soysuper.com/8a46b53adb87e81a393d43b3adfc95b1.340.340.0.min.wmark.6d8d0fcf.jpg",
      "precio": 0.75,
      "descripcion": "Tableta 100 g",
      "fk_categoria": 7,
      "cantidad": 1
    }

    ]
    this.total = 0;
    this.nombreLista = "Mi Lista"
  }

  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    this.caclculateTotal()
  }

  caclculateTotal() {
    for (let product of this.productsInList) {
      this.total += (product.cantidad * product.precio)
    }
  }

  deleteElement(pProduct) {
    console.log(pProduct)
  }

  minusOneElement(pProduct) {
    if (pProduct.cantidad) {
      console.log(pProduct.cantidad)
    } else {
      console.log(1)
    }
  }

  onGuardarLista() {
    const productsIdList = [];
    for (let product of this.productsInList) {
      if (product.cantidad > 1) {
        for (let i = 1; i <= product.cantidad; i++) {
          productsIdList.push(product.id)
        }
      } else {
        productsIdList.push(product.id)

      }
    }
    console.log(productsIdList);
    this.productsInList = [];
    this.total = 0;
    this._success.next(`La lista "${this.nombreLista}" se ha guardado correctamente!`);
    this.nombreLista = "Mi Lista"

  }
}

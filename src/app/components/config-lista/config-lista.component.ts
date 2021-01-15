import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { faTrashAlt, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Product } from 'src/app/interfaces/product';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { bootstrapAnimateAlert } from '../../animations/animations'
import { ListasService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-config-lista',
  templateUrl: './config-lista.component.html',
  styleUrls: ['./config-lista.component.css'],
  animations: [bootstrapAnimateAlert]
})
export class ConfigListaComponent implements OnInit {
  private _success = new Subject<string>();
  successMessage = '';
  faTrashAlt = faTrashAlt;
  faMinus = faMinus;

  productsInList: Product[];
  total: number;
  presupuesto: number;
  nombreLista: string;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;


  constructor(
    private navbarService: NavbarService,
    private listasService: ListasService
  ) {
    this.navbarService.showNavbar(true)
    this.productsInList = this.listasService.getNewList();
    this.total = 0;
    this.nombreLista = '';
  }

  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    this.caclculateTotal();
    if (localStorage.getItem('nombreLista')) {
      this.nombreLista = localStorage.getItem('nombreLista')
    }
    if (localStorage.getItem('presupuesto')) {
      this.presupuesto = parseInt(localStorage.getItem('presupuesto'))
    }
  }

  ngOnDestroy() {
    localStorage.setItem('nombreLista', this.nombreLista);
    localStorage.setItem('presupuesto', JSON.stringify(this.presupuesto));
  }

  caclculateTotal() {
    this.total = 0;
    for (let product of this.productsInList) {
      this.total += (product.cantidad * product.precio)
    }
  }

  deleteElement(pProduct) {
    this.listasService.removeProductNewList(pProduct.id, true);
    this.caclculateTotal();
    if (!this.productsInList.length) {
      this.listasService.emptyNewList()
    }
  }

  minusOneElement(pProduct) {
    if (pProduct.cantidad > 1) {
      this.listasService.removeProductNewList(pProduct.id);
    } else {
      this.listasService.removeProductNewList(pProduct.id, true)
    }
    this.caclculateTotal()
    if (!this.productsInList.length) {
      this.listasService.emptyNewList()
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
    this.listasService.emptyNewList();
    this.productsInList = [];
    this.total = 0;
    if (!this.nombreLista) this.nombreLista = "Mi Lista"
    this._success.next(`La lista "${this.nombreLista}" se ha guardado correctamente!`);
    this.nombreLista = ""
    this.presupuesto = null;
    localStorage.setItem('nombreLista', this.nombreLista);
    localStorage.setItem('presupuesto', null);


  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { faTrashAlt, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Product } from 'src/app/interfaces/product';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { bootstrapAnimateAlert } from '../../animations/animations'
import { ListasService } from 'src/app/services/listas.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-config-lista',
  templateUrl: './config-lista.component.html',
  styleUrls: ['./config-lista.component.css'],
  animations: [bootstrapAnimateAlert]
})
export class ConfigListaComponent implements OnInit {
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  successMessage = '';
  errorMessage = '';
  faTrashAlt = faTrashAlt;
  faMinus = faMinus;

  productsInList: Product[];
  total: number;
  presupuesto: number;
  nombreLista: string;
  userId: number;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  @ViewChild('selfClosingAlert2', { static: false }) selfClosingAlert2: NgbAlert;


  constructor(
    private navbarService: NavbarService,
    private listasService: ListasService,
    private loaderService: LoaderService
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
    this._error.subscribe(message => this.errorMessage = message);
    this._error.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert2) {
        this.selfClosingAlert2.close();
      }
    });


    this.total = this.listasService.calculateTotal(this.productsInList)
    if (localStorage.getItem('nombreLista')) {
      this.nombreLista = localStorage.getItem('nombreLista')
    }
    if (localStorage.getItem('presupuesto')) {
      this.presupuesto = parseInt(localStorage.getItem('presupuesto'))
    }

    if (localStorage.getItem('user_id')) {
      this.userId = parseInt(localStorage.getItem('user_id'))
    } else {
      this.userId = 0;
    }
  }

  ngOnDestroy() {
    localStorage.setItem('nombreLista', this.nombreLista);
    localStorage.setItem('presupuesto', JSON.stringify(this.presupuesto));
  }

  deleteElement(pProduct) {
    this.listasService.removeProductNewList(pProduct.id, true);
    this.total = this.listasService.calculateTotal(this.productsInList);
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
    this.total = this.listasService.calculateTotal(this.productsInList);
    if (!this.productsInList.length) {
      this.listasService.emptyNewList()
    }
  }

  cargarListaFav() {

    this.listasService.loadFavoriteList();
    this.productsInList = this.listasService.getNewList();
    this.total = this.listasService.calculateTotal(this.productsInList)

  }

  borrarLista() {
    this.listasService.emptyNewList()
    this.productsInList = []
    this.total = 0;
    this.nombreLista = ''
  }

  async onGuardarLista() {
    if (!this.userId) {
      this._error.next('debes iniciar sesión para guardar listas');
    } else {
      try {
        if (!this.nombreLista) this.nombreLista = "Mi Lista"
        this.loaderService.loadingTrue()
        const result = await this.listasService.saveNewList(this.userId, this.nombreLista);
        this.loaderService.loadingFalse()
        // console.log(result)
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
        this._success.next(`La lista "${this.nombreLista}" se ha guardado correctamente!`);
        this.nombreLista = ""
        this.presupuesto = null;
        localStorage.setItem('nombreLista', this.nombreLista);
        localStorage.setItem('presupuesto', null);
      } catch (error) {
        this.listasService.emptyNewList();
        this._error.next('Ha ocurrido un error');
        this.productsInList = [];
        this.nombreLista = ""
        this.presupuesto = null;
        this.total = 0;
        localStorage.setItem('nombreLista', this.nombreLista);
        localStorage.setItem('presupuesto', null);
        // return console.log(error.error)
      }
    }


  }
}

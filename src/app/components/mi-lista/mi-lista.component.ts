import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ListasService } from 'src/app/services/listas.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { bootstrapAnimateAlert } from '../../animations/animations'
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mi-lista',
  templateUrl: './mi-lista.component.html',
  styleUrls: ['./mi-lista.component.css'],
  animations: [bootstrapAnimateAlert]
})
export class MiListaComponent implements OnInit {
  private _error = new Subject<string>();
  errorMessage = '';

  nombreLista: string;
  productsInList: Product[];
  total: number;
  list: any;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;

  constructor(
    private navbarServices: NavbarService,
    private listasService: ListasService,
    private userService: UsersService
  ) {
    this.navbarServices.showNavbar(true)
    this.nombreLista = 'No hay lista guardada'
  }

  async ngOnInit() {
    this._error.subscribe(message => this.errorMessage = message);
    this._error.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    try {
      this.list = await this.listasService.getLastList();
      if (this.list) {
        this.productsInList = this.list.productos
        this.nombreLista = this.list.titulo
        this.total = this.listasService.calculateTotal(this.productsInList)
      }
    } catch (error) {
      console.log(error)
      if (error.error.error === 'The token is expired') {
        this._error.next('Ha caducado tu sesión.')
        console.log(error.error.error === 'The token is expired')
      } else {
        this._error.next('Ha ocurrido un error, debes identificarte nuevamente.')
      }
      setTimeout(() => {
        this.userService.logOut()
      }, 3000);

    }

  }


  onCheck($event) {
    $event.target.classList.toggle('slected-check')
    $event.target.parentNode.firstChild.classList.toggle("super-line")
    $event.target.parentNode.classList.toggle("selected-item")
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { faSearch, faSignOutAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbModal,
  ModalDismissReasons,
  NgbAlert,
} from '@ng-bootstrap/ng-bootstrap';
import {
  CustomAdapter,
  CustomDateParserFormatter,
} from 'src/app/services/datepicker-adapter';
import { NavbarService } from 'src/app/services/navbar.service';
import { faEdit, faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import { Lista } from 'src/app/interfaces/lista';
import { ngIfAnimate, ngIfAnimate2 } from 'src/app/animations/animations';
import { ListasService } from 'src/app/services/listas.service';
import {
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { UsersService } from 'src/app/services/users.service';
import { PerfilService } from 'src/app/services/perfil.service';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
};

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  animations: [ngIfAnimate, ngIfAnimate2],
})
export class PerfilComponent implements OnInit {
  faSearch = faSearch;
  faEdit = faEdit;
  faStar = faStar;
  faStarOutline = faStarOutline;
  faSingOut = faSignOutAlt;
  closeResult = '';
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  errorsMessage = '';
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  @ViewChild('selfClosingAlert2', { static: false }) selfClosingAlert2: NgbAlert;
  config: PerfectScrollbarConfigInterface = {};

  searchText: string;
  searchForm: FormGroup;
  modalForm: FormGroup;
  placeholderDate: Date;
  listasBuscadas: Lista[];
  listaCargada: Lista;
  totalListaCargada: number;
  data: any;
  username: string;
  imgUrl: string;
  showStarFav: boolean;
  listaFavId: number;

  constructor(
    private navbarService: NavbarService,
    private modalService: NgbModal,
    private listasService: ListasService,
    private userService: UsersService,
    private perfilService: PerfilService
  ) {
    this.data = {
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      datasets: [
        {
          label: 'Gastos Mensuales "€"',
          backgroundColor: '#2A4420',
          borderColor: '#192913',
          data: [65, 59, 80, 81, 56, 55, 35, 56, 55, 90, 70, 120],
        },
      ],
    };

    this.showStarFav = false;
    this.username = '';
    this.imgUrl = "../../../assets/svg/user-gray.svg"
    this.navbarService.showNavbar(true);
    this.placeholderDate = new Date();
    this.listaCargada = {
      id: null,
      titulo: 'No hay lista',
      fecha: '',
      fk_usuario: null,
      productos: [],
    };
    this.totalListaCargada = 0;

    this.searchForm = new FormGroup(
      {
        fechaDesde: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4})$/
          ),
        ]),
        fechaHasta: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4})$/
          ),
        ]),
      },
      [this.dateValidators()]
    );

    this.modalForm = new FormGroup({
      avatarUrl: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        ),
      ]),
    });
  }

  async ngOnInit() {
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    this._error.subscribe((message) => (this.errorsMessage = message));
    this._error.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert2) {
        this.selfClosingAlert2.close();
      }
    });

    this.checkFavorite()

    const userInfo = await this.perfilService.getUserInfo();
    // console.log(userInfo)
    if (userInfo) {
      this.username = userInfo.user;
      if (this.loadImage(userInfo.avatar)) {
        this.imgUrl = userInfo.avatar
      }
    }
    if (!this.imgUrl) this.imgUrl = "../../../assets/svg/user-gray.svg"

  }

  async checkFavorite() {
    const favList = await this.listasService.getFavoriteList();
    if (favList) {
      this.listaFavId = favList.id;
      this.showStarFav = true;
      this.listaCargada = favList
    } else {
      this.listaCargada = {
        id: null,
        titulo: 'No hay lista',
        fecha: '',
        fk_usuario: null,
        productos: [],
      };
    }
  }

  public changeSuccessMessage(pMessage) {
    this._success.next(pMessage);
  }
  public errorMessage(pMessage) {
    this._error.next(pMessage);
  }

  async search() {
    if (!this.searchText) {
      this.listasBuscadas = null;
      this.checkFavorite()
    } else {
      const result = await this.perfilService.searchByInput(this.searchText)
      console.log(result)
      this.listasBuscadas = result;
    }

  }

  async toggleFavorite() {
    if (!this.listaCargada.id) return
    console.log(this.listaCargada.id)
    if (this.showStarFav) {
      this.listaFavId = null;
      this.showStarFav = false;
      this.errorMessage('La lista ya no es la favorita')
      await this.perfilService.removeFavoriteList();
    } else {
      this.showStarFav = true;
      this.listaFavId = this.listaCargada.id

      this.changeSuccessMessage('Lista marcada como favorita');
      await this.perfilService.createFavoriteList(this.listaCargada.id);
    }

  }


  async onSubmitSearch() {
    let fechaDesdeValue = this.searchForm.value.fechaDesde;
    let fechaHastaValue = this.searchForm.value.fechaHasta;
    fechaDesdeValue = this.parseToStringFormat(fechaDesdeValue);
    fechaHastaValue = this.parseToStringFormat(fechaHastaValue);
    console.log({ fechaDesdeValue, fechaHastaValue });

    try {
      this.listasBuscadas = await this.perfilService.getListDateRange(fechaDesdeValue, fechaHastaValue);

    } catch (error) {
      console.warn(error);
    }
  }

  async onModalSubmit() {
    const avatarUrl = this.modalForm.value.avatarUrl;
    if (this.loadImage(avatarUrl)) {
      const result = await this.perfilService.changeUserAvatar(this.modalForm.value.avatarUrl)
      const userInfo = await this.perfilService.getUserInfo();
      this.imgUrl = userInfo.avatar
      this.changeSuccessMessage('Avatar acutalizado correctamente!');
    } else {
      this.errorMessage('Ha habido un problema con la url, no se ha actualizado')
    }
    this.modalForm.reset();
  }
  borrarFechas() {
    this.searchForm.reset();
    this.searchText = '';
    this.listasBuscadas = null;
  }

  loadImage = (url) => {
    let image = new Image();
    var url_image = url;
    image.src = url_image;
    if (image.width == 0) {
      return false;
    } else {
      return true;
    }
  }


  open(content) {
    this.modalForm.reset();
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async cargarLista(list: Lista) {
    const listInfo = list;
    const productos = await this.perfilService.getSearchedList(listInfo.id);
    if (this.listaFavId === listInfo.id) {
      this.showStarFav = true;
      console.log(true, this.listaFavId, listInfo.id)
    } else {
      this.showStarFav = false;
      console.log(false, this.listaFavId, listInfo.id)

    }
    this.listaCargada = listInfo;
    this.listaCargada.productos = productos;
  }

  parseToDateFormat(date: string): Date {
    const destructurDate = date.split('-');
    if (destructurDate[0].length === 1)
      destructurDate[0] = '0' + destructurDate[0];
    if (destructurDate[1].length === 1)
      destructurDate[1] = '0' + destructurDate[1];
    let parsedDate = destructurDate.join('-');
    const result = new Date(
      parsedDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
    );
    return result;
  }

  parseToStringFormat(date: string): string {
    const destructurDate = date.split('-');
    if (destructurDate[0].length === 1)
      destructurDate[0] = '0' + destructurDate[0];
    if (destructurDate[1].length === 1)
      destructurDate[1] = '0' + destructurDate[1];
    let parsedDate = [destructurDate[2], destructurDate[1], destructurDate[0]].join('/');
    return parsedDate;
  }

  dateValidators() {
    return (form: FormGroup) => {
      let fechaFrom = form.get('fechaDesde').value;
      let fechaTo = form.get('fechaHasta').value;
      if (fechaFrom && fechaTo) {
        fechaFrom = this.parseToDateFormat(fechaFrom);
        fechaTo = this.parseToDateFormat(fechaTo);
        if (fechaFrom <= fechaTo) {
          return null;
        } else {
          return { dateValidators: true };
        }
      }
    };
  }

  logOut() {
    this.userService.logOut()
  }


}

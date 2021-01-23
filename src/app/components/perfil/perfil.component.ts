import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import { Lista } from 'src/app/interfaces/lista';
import { ngIfAnimate, ngIfAnimate2 } from 'src/app/animations/animations';
import { ListasService } from 'src/app/services/listas.service';
import {
  PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';


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
  faSingOut = faSignOutAlt;
  closeResult = '';
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  config: PerfectScrollbarConfigInterface = {};

  searchText: string;
  searchForm: FormGroup;
  modalForm: FormGroup;
  placeholderDate: Date;
  listasBuscadas: Lista[];
  listaCargada: Lista;
  totalListaCargada: number;
  data: any;

  constructor(
    private navbarService: NavbarService,
    private modalService: NgbModal,
    private listasService: ListasService,
    private router: Router
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

    this.navbarService.showNavbar(true);
    this.placeholderDate = new Date();
    this.listaCargada = {
      id: 1,
      titulo: 'Mi Lista',
      fecha: '2020-10-25 15:53:11',
      fk_usuario: 1,
      productos: [
        {
          id: 1,
          marca: 'Hacendado',
          nombre: 'Bacon taquitos',
          imagen:
            'https://a2.soysuper.com/2ead27424e55902df72c266ab9b47629.340.340.0.min.wmark.796266d1.jpg',
          precio: 1.95,
          descripcion: 'Pack 2 x 125 g - 250 g',
          fk_categoria: 5,
          cantidad: 1,
        },
        {
          id: 2,
          marca: 'Hacendado',
          nombre: 'Fuet espetec extra',
          imagen:
            'https://a1.soysuper.com/1fb3977901e45a47c482ec3fbe69a541.340.340.0.min.wmark.06f2f5fb.jpg',
          precio: 2.05,
          descripcion: 'Pieza 240 g',
          fk_categoria: 5,
          cantidad: 1,
        },
        {
          id: 3,
          marca: 'Hacendado',
          nombre: 'Queso rallado hilos pizza (mozzarella)',
          imagen:
            'https://a1.soysuper.com/dd7d2add51ede354c96c245e15a446cc.340.340.0.min.wmark.cbec57f5.jpg',
          precio: 1.2,
          descripcion: 'Paquete 200 g',
          fk_categoria: 5,
          cantidad: 1,
        },
        {
          id: 4,
          marca: 'Hacendado',
          nombre:
            'Queso rallado hilos 4 variedades (emental-cheddar-gouda-curado) fundir y gratinar',
          imagen:
            'https://a1.soysuper.com/1187328ec5916cda6c96e6faedbb3379.340.340.0.min.wmark.0b7441ac.jpg',
          precio: 1.59,
          descripcion: 'Paquete 180 g',
          fk_categoria: 5,
          cantidad: 1,
        },
        {
          id: 5,
          marca: 'Hacendado',
          nombre: 'Jamon cocido extra lonchas finas',
          imagen:
            'https://a2.soysuper.com/038ae6dfadb153139dd66b8708c378da.340.340.0.min.wmark.e3d156d1.jpg',
          precio: 2.99,
          descripcion: 'Pack 2 x 225 g - 450 g',
          fk_categoria: 5,
          cantidad: 1,
        },
        {
          id: 6,
          marca: 'Hacendado',
          nombre: 'Salchicha frankfurt 7 U',
          imagen:
            'https://a1.soysuper.com/12bea20d1ec4853f9dc8a2520d3b5ff1.340.340.0.min.wmark.e6f4e4a4.jpg',
          precio: 1.45,
          descripcion: 'Paquete pack 4 x 176 g - 704 g',
          fk_categoria: 5,
          cantidad: 1,
        },
        {
          id: 7,
          marca: 'Hacendado',
          nombre: 'Queso barra havarti en lonchas',
          imagen:
            'https://a1.soysuper.com/6a6ec66010bffc367ff210fe96118fc4.340.340.0.min.wmark.4d45f188.jpg',
          precio: 2.5,
          descripcion: 'Paquete 300 g',
          fk_categoria: 5,
          cantidad: 1,
        },
        {
          id: 8,
          marca: 'Hacendado',
          nombre: 'Fiambre pechuga pavo lonchas finas',
          imagen:
            'https://a2.soysuper.com/22e978f4243d214753fa3ba11b830c03.340.340.0.min.wmark.967fe2fa.jpg',
          precio: 2.89,
          descripcion: 'Paquete pack 2 x 200 g - 400 g',
          fk_categoria: 5,
          cantidad: 1,
        },
      ],
    };
    this.totalListaCargada = this.listasService.calculateTotal(
      this.listaCargada.productos
    );

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

  ngOnInit(): void {
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  public changeSuccessMessage() {
    this._success.next('Avatar acutalizado correctamente!');
  }

  search() {
    console.log(this.searchText);
    this.listasBuscadas = [
      {
        id: 1,
        titulo: 'Mi Lista',
        fecha: '2020-10-25 15:53:11',
        fk_usuario: 1,
      },
      {
        id: 2,
        titulo: 'Mi Lista',
        fecha: '2020-10-25 15:53:11',
        fk_usuario: 1,
      },
      {
        id: 2,
        titulo: 'Mi Lista',
        fecha: '2020-10-25 15:53:11',
        fk_usuario: 1,
      },
      {
        id: 3,
        titulo: 'Mi Lista',
        fecha: '2020-10-25 15:53:11',
        fk_usuario: 1,
      },
    ];
    if (!this.searchText) this.listasBuscadas = null;
  }

  onSubmitSearch() {
    let fechaDesdeValue = this.searchForm.value.fechaDesde;
    let fechaHastaValue = this.searchForm.value.fechaHasta;
    fechaDesdeValue = this.parseToDateFormat(fechaDesdeValue);
    fechaHastaValue = this.parseToDateFormat(fechaHastaValue);
    this.listasBuscadas = [
      {
        id: 1,
        titulo: 'Mi Lista',
        fecha: '2020-10-25 15:53:11',
        fk_usuario: 1,
      },
      {
        id: 2,
        titulo: 'Mi Lista',
        fecha: '2020-10-25 15:53:11',
        fk_usuario: 1,
      },
      {
        id: 3,
        titulo: 'Mi Lista',
        fecha: '2020-10-25 15:53:11',
        fk_usuario: 1,
      },
    ];

    console.log({ fechaDesdeValue, fechaHastaValue });
  }

  onModalSubmit() {
    console.log(this.modalForm.value);
    this.modalForm.reset();
    this.changeSuccessMessage();
  }
  borrarFechas() {
    this.searchForm.reset();
    this.searchText = '';
    this.listasBuscadas = null;
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

  cargarLista(listId: number) {
    console.log(listId);
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
    localStorage.removeItem('user_token');
    this.navbarService.showLogin(true);
    this.router.navigate(['/inicio']);
  }


}

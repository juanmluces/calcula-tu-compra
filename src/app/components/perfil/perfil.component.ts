import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/services/datepicker-adapter';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class PerfilComponent implements OnInit {
  faSearch = faSearch;
  searchText: string;
  fechaInicio: any;
  searchForm: FormGroup;
  placeholderDate: Date;

  constructor(private navbarService: NavbarService) {
    this.navbarService.showNavbar(true);
    this.placeholderDate = new Date;


    this.searchForm = new FormGroup({
      fechaDesde: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4})$/)
      ]),
      fechaHasta: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4})$/),
      ]),
    }, [this.dateValidators])

  }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchText)
  }

  onSubmitSearch() {
    let fechaDesdeValue = this.searchForm.value.fechaDesde;
    let fechaHastaValue = this.searchForm.value.fechaHasta;
    fechaDesdeValue = this.parseToDateFormat(fechaDesdeValue);
    fechaHastaValue = this.parseToDateFormat(fechaHastaValue);
    console.log({ fechaDesdeValue, fechaHastaValue })
  }

  parseToDateFormat(date: string): Date {

    const destructurDate = date.split('-');
    if (destructurDate[0].length === 1) destructurDate[0] = '0' + destructurDate[0];
    if (destructurDate[1].length === 1) destructurDate[1] = '0' + destructurDate[1];
    let parsedDate = destructurDate.join('-');
    const result = new Date(parsedDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    return result;
  }

  borrarFechas() {
    this.searchForm.reset()
    this.searchText = '';

  }

  dateValidators(form: FormGroup) {

    let fechaFrom = form.get('fechaDesde').value;
    let fechaTo = form.get('fechaHasta').value;
    if (fechaFrom && fechaTo) {
      let destructurDate = fechaFrom.split('-');
      if (destructurDate[0].length === 1) destructurDate[0] = '0' + destructurDate[0];
      if (destructurDate[1].length === 1) destructurDate[1] = '0' + destructurDate[1];
      let parsedDate = destructurDate.join('-');
      fechaFrom = new Date(parsedDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

      destructurDate = fechaTo.split('-');
      if (destructurDate[0].length === 1) destructurDate[0] = '0' + destructurDate[0];
      if (destructurDate[1].length === 1) destructurDate[1] = '0' + destructurDate[1];
      parsedDate = destructurDate.join('-');
      fechaTo = new Date(parsedDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

      if (fechaFrom <= fechaTo) return null;
      form.get('fechaHasta').setErrors({ dateValidators: true })
      return { dateValidators: true };
    }

  }
}







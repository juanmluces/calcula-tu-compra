import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { faTrashAlt, faMinus } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-config-lista',
  templateUrl: './config-lista.component.html',
  styleUrls: ['./config-lista.component.css']
})
export class ConfigListaComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faMinus = faMinus;

  constructor(private navbarService: NavbarService) {
    this.navbarService.showNavbar(true)

  }

  ngOnInit(): void {
  }

}

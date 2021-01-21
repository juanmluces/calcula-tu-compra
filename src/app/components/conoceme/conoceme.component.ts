import { Component, OnInit } from '@angular/core';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-conoceme',
  templateUrl: './conoceme.component.html',
  styleUrls: ['./conoceme.component.css'],
})
export class ConocemeComponent implements OnInit {
  faLinkedin = faLinkedin;
  faGithub = faGithubSquare;
  bioContent: {};
  appContent: {};
  showContent: any;

  button = 1;

  constructor(private navbarService: NavbarService) {
    this.navbarService.showNavbar(true);
    this.bioContent = {
      title: '¿Quién es Juan Miguel Luces?',
      content: [
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores consequatur, inventore aperiam impedit laboriosam perferendis similique illo iusto voluptatum accusamus sed sapiente voluptatem dignissimos quae totam praesentium qui vero fuga.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus minima magni enim, voluptatem deserunt quam?',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt odio sapiente in. Perferendis fugit eligendi quia quaerat sit corporis, laudantium veniam voluptatibus suscipit nemo officiis iusto quam explicabo placeat libero? Numquam recusandae sunt non eos ab, quidem doloremque modi beatae quia, at sed! Temporibus nihil explicabo nulla vero repellat recusandae?',
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, dolorum?',
      ],
    };
    this.appContent = {
      title: '¿Qué es Calculatucompra?',
      content: [
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores consequatur, inventore aperiam impedit laborios accusamus sed sapiente voluptatem dignissimos quae totam praesentium qui vero fuga.',
        'Lorem ipsum dit. Temporibus minima magni enim, voluptatem deserunt quam?',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt odio sapiente in. Perferendis fugit eligendi quia quaerat sit corporis, laudantiumro? Numquam recusandae sunt non eos ab, quidem doloremque modi beatae quia, at sed! Temporibus voluptatem dignissimos quae totam praesentium qui vero fuga.',
        'Lorem ipsum dit. Temporibus minima magni eni nihil explicabo nulla vero repellat recusandae?',
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias, dolorum?',
      ],
    };
    this.showContent = this.bioContent;
  }

  ngOnInit(): void {}

  selectText() {
    if (this.button) {
      this.showContent = this.bioContent;
    } else {
      this.showContent = this.appContent;
    }
  }
}

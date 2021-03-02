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
        'Soy <strong>Desarrollador Full Stack</strong> o, también conocido como, programador web. Construyo en HTML, me expreso en CSS y hablo en JavaScript.',
        'Aunque la verdad no es todo lo que soy, mas bien no he sido un programador toda mi vida. Fue pasados ya mis treinta cuándo decidí que tenía que seguir mis pasiones y convertir mis intereses y habilidades en una carrera.',
        'Después de muchas horas de estudio, lectura, práctica, frustraciones y logros, estaba firmemente convencido de que éste era mi camino y decidí completar mis estudios formales con un Bootcamp intensivo de desarrollo full-stack <a href="https://www.neoland.es/" target="_blank" >(en concreto éste)</a> y eso ha sido una de las mejores decisiones que he tomado.',
        'Y aquí estoy, armado con mis herramientas favoritas <strong>(HTML, CSS, JavaScript, MySql, Angular, Mongo...) </strong> haciendo trabajos y proyectos que me llenan de alegría y que hago con pasión por el arte de programar y con la satisfacción de saber que estoy trabajando en mi "salsa".'
      ],
    };
    this.appContent = {
      title: '¿Qué es Calculatucompra?',
      content: [
        'Es una aplicación <strong>Full Stack</strong>, en otras palabras, que se compone de código del lado del cliente (todo lo que ves) y código del lado del servidor (rutas, bases de datos y demás).',
        'Es un rediseño y recableado de mi <strong>proyecto de fin de curso </strong>cuyo propósito es el de "compilar" <em>(guiño guiño programadores)</em> los conocimientos que adquirí durante mi período de estudiante y, a la vez crear una aplicación sencilla que se pueda usar en el mundo real.',
        `¿Cómo se usa? pues muy fácil:
        <ol class="bio-ol">
           <li>Te creas una cuenta con un <strong>usuario y una contraseña </strong>(no se necesitan datos personales, ni emails).
           </li>
           <li>Agregas los productos que quieres comprar la próxima vez que vayas al súper y <strong> guardas la lista.</strong>
           </li>
           <li>Cuando vayas al súper<strong> abres la web desde el móvil</strong> y en la pestaña de "En el súper" verás tu lista para que sepas que productos necesitabas.
           </li>
        </ol>
        `,
        '<strong>y listo!!</strong>',
        'bueno hay mas funciones como crear una <strong>lista favorita, buscar listas antiguas, cambiar tu avatar y ver el histórico de gastos del año.</strong>',
        'como ves es muy sencilla, ahora a hacer la compra!'
      ],
    };
    this.showContent = this.bioContent;
  }

  ngOnInit(): void { }

  selectText() {
    if (this.button) {
      this.showContent = this.bioContent;
    } else {
      this.showContent = this.appContent;
    }
  }
}

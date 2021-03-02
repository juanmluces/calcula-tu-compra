import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faPlusCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs"
import { NavbarService } from './services/navbar.service';
import { componentAnimate, ngIfAnimate, navbarAnimation } from './animations/animations'
import { ListasService } from './services/listas.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    componentAnimate,
    ngIfAnimate,
    navbarAnimation
  ]
})
export class AppComponent {
  title = 'calcula-tu-compra';
  faListAlt = faListAlt;
  faPlusCircle = faPlusCircle;
  faStar = faStar;
  showPlusIcon: boolean;
  showStarIcon: boolean;
  showNav: boolean;
  showMobileNav: boolean;
  mobileNavOpened: boolean;
  navbar$: Observable<boolean>;
  plusIcon$: Observable<boolean>;
  starIcon$: Observable<boolean>;
  logged$: Observable<boolean>;
  @ViewChild('navBurguer') navBurguer: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('logo') logo: ElementRef;
  logoUrl: string;
  logged: boolean;


  constructor(
    private navbarService: NavbarService,
    private rd: Renderer2,
    private listasService: ListasService
  ) {
    this.logged$ = this.navbarService.getLoginStatus$();
    this.logged$.subscribe(logged => this.logged = logged);

    this.navbar$ = this.navbarService.getNavbarStatus$();
    this.navbar$.subscribe(navbar => this.showNav = navbar)

    this.plusIcon$ = this.listasService.getPlusIconStatus$();
    this.plusIcon$.subscribe(plusIcon => this.showPlusIcon = plusIcon);

    this.starIcon$ = this.listasService.getFavoriteStatus$();
    this.starIcon$.subscribe(starIcon => this.showStarIcon = starIcon);

    this.showMobileNav = true;
    this.mobileNavOpened = false;
    this.logoUrl = "../assets/svg/LOGO.svg";
    this.showPlusIcon = false;
  }

  async ngOnInit() {
    this.checkWidthShowNavbar();
    window.onresize = () => { this.checkWidthShowNavbar() }
    if (localStorage.getItem('user_token')) {
      this.navbarService.showLogin(false);
    } else {
      this.navbarService.showLogin(true);
    }

    // if (this.logged) {
    //   try {
    //     const favList = await this.listasService.getFavoriteList();
    //     if (favList) {
    //       this.listasService.showStarIcon(true);
    //       favList.productos.forEach(producto => {
    //         if (producto.cantidad > 1) {
    //           for (let cantidad = 1; cantidad <= producto.cantidad; cantidad++) {
    //             this.listasService.addProductToList(producto)
    //           }
    //         } else {
    //           this.listasService.addProductToList(producto)
    //         }
    //       });
    //       this.listasService.showPlusIcon(false)
    //     } else {
    //       this.listasService.showStarIcon(false)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }

  ngAfterViewInit() {


  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  checkWidthShowNavbar() {
    if (window.screen.width > 800) {
      this.showMobileNav = true;
      this.logoUrl = '../assets/svg/LOGO.svg'

    } else {
      if (!this.mobileNavOpened) {
        this.showMobileNav = false;
      }
      this.logoUrl = "../assets/svg/solo-logo-color.svg"
    }
  }

  closeNavbarMobile() {
    if (window.screen.width <= 800) {
      this.rd.removeClass(this.navBurguer.nativeElement, 'hamburguer-bar--close');
      this.showMobileNav = false;
      this.mobileNavOpened = false;
      this.rd.removeClass(this.wrapper.nativeElement, 'lock-scroll');
    }
  }

  displayNavMenu($event) {
    let hamburguerBar;
    if ($event.target.children.length) {
      hamburguerBar = $event.target.children[0]
    } else {
      hamburguerBar = $event.target

    }
    hamburguerBar.classList.toggle('hamburguer-bar--close')
    this.mobileNavOpened = !this.mobileNavOpened;
    this.showMobileNav = !this.showMobileNav;
    if (this.showMobileNav) {
      this.rd.addClass(this.wrapper.nativeElement, 'lock-scroll');
    } else {
      this.rd.removeClass(this.wrapper.nativeElement, 'lock-scroll');
    }

  }




}


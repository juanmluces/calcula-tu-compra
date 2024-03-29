import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { bootstrapAnimateAlert, ngIfAnimate } from 'src/app/animations/animations';
import { LoaderService } from 'src/app/services/loader.service';
// import { ListasService } from 'src/app/services/listas.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations: [ngIfAnimate, bootstrapAnimateAlert],
})
export class InicioComponent implements OnInit {
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  successMessage = '';
  errorMessage = '';
  loginForm: FormGroup;
  signUpForm: FormGroup;
  homeBox: boolean;
  loginBox: boolean;
  signUpBox: boolean;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  @ViewChild('selfClosingAlert2', { static: false }) selfClosingAlert2: NgbAlert;

  constructor(
    private navbarService: NavbarService,
    private usersService: UsersService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.homeBox = true;
    this.loginBox = false;
    this.signUpBox = false;

    this.navbarService.showNavbar(false);

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
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



  }

  async onLoginSubmit() {
    const loginUser = this.loginForm.value;
    this.loaderService.loadingTrue()
    const result = await this.usersService.loginUser(loginUser);
    this.loaderService.loadingFalse()
    if (result.error) {
      this._error.next(result.error);
    } else {
      this._success.next(result.success);
      localStorage.setItem('user_id', JSON.stringify(result.userId))
      localStorage.setItem('user_token', JSON.stringify(result.token));
      this.navbarService.showLogin(false);
      this.router.navigate(['/categorias']);
    }
    this.loginForm.reset();
  }

  async onSignUpSubmit() {
    const newUser = this.signUpForm.value;
    this.loaderService.loadingTrue()
    const result = await this.usersService.createUser(newUser);
    this.loaderService.loadingFalse()
    if (result.error) {
      this._error.next(result.error);
    } else {
      this._success.next(result.message);
      this.loaderService.loadingTrue()
      const logResult = await this.usersService.loginUser(newUser);
      this.loaderService.loadingFalse()
      localStorage.setItem('user_token', JSON.stringify(logResult.token));
      this.navbarService.showLogin(false);
      this.router.navigate(['/categorias']);
      console.log(logResult);
    }
    this.signUpForm.reset();
  }

  onIniciaSesion() {
    this.homeBox = false;
    setTimeout(() => {
      this.loginBox = true;
    }, 300);
  }

  onSingUp() {
    this.homeBox = false;
    setTimeout(() => {
      this.signUpBox = true;
    }, 300);
  }

  onVolver($event) {
    $event.preventDefault();
    $event.currentTarget.disabled = true;
    this.loginForm.reset();
    this.signUpForm.reset();
    if (this.loginBox) this.loginBox = false;
    if (this.signUpBox) this.signUpBox = false;
    setTimeout(() => {
      this.homeBox = true;
    }, 300);
  }
}

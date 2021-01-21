import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngIfAnimate } from 'src/app/animations/animations';
import { NavbarService } from 'src/app/services/navbar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations: [ngIfAnimate],
})
export class InicioComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  homeBox: boolean;
  loginBox: boolean;
  signUpBox: boolean;

  constructor(
    private navbarService: NavbarService,
    private usersService: UsersService,
    private router: Router
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

  ngOnInit(): void { }

  async onLoginSubmit() {
    const loginUser = this.loginForm.value;
    const result = await this.usersService.loginUser(loginUser);
    console.log(result);
    if (result.error) {
      alert(result.error);
    } else {
      alert(result.success);
      localStorage.setItem('user_token', JSON.stringify(result.token));
      this.navbarService.showLogin(false);
      this.router.navigate(['/categorias']);
    }
    this.loginForm.reset();
  }

  async onSignUpSubmit() {
    const newUser = this.signUpForm.value;
    const result = await this.usersService.createUser(newUser);
    if (result.error) {
      alert(result.error);
    } else {
      alert(result.message);
      const logResult = await this.usersService.loginUser(newUser);
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

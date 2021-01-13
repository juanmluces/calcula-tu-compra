import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ngIfAnimate } from 'src/app/animations/animations';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations: [
    ngIfAnimate
  ]

})
export class InicioComponent implements OnInit {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  homeBox: boolean;
  loginBox: boolean;
  signUpBox: boolean;



  constructor(private navbarService: NavbarService) {
    this.homeBox = true;
    this.loginBox = false;
    this.signUpBox = false;

    this.navbarService.showNavbar(false);

    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });

    this.signUpForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });

  }

  ngOnInit(): void {
  }


  onLoginSubmit() {
    console.log(this.loginForm.value);
    this.loginForm.reset();

  }

  onSignUpSubmit() {
    console.log(this.signUpForm.value);
    this.signUpForm.reset();
  }

  onIniciaSesion() {
    this.homeBox = false;
    setTimeout(() => {
      this.loginBox = true;
    }, 200);
  }

  onSingUp() {
    this.homeBox = false;
    setTimeout(() => {
      this.signUpBox = true;
    }, 200);
  }

  onVolver($event) {
    $event.preventDefault();
    $event.currentTarget.disabled = true;
    this.loginForm.reset();
    this.signUpForm.reset();
    if (this.loginBox) this.loginBox = false;
    if (this.signUpBox) this.signUpBox = false;
    setTimeout(() => {
      this.homeBox = true
    }, 200);

  }



}

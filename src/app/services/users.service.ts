import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ListasService } from './listas.service';
import { NavbarService } from './navbar.service';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string;




  constructor(private httpClient: HttpClient,
    private navbarService: NavbarService,
    private router: Router,
    private listasService: ListasService) {
    this.baseUrl = environment.apiUrl+'users/';

  }

  createUser(pUser): Promise<any> {
    return this.httpClient
      .post<any>(this.baseUrl + 'create', pUser)
      .toPromise();
  }

  loginUser(pUser): Promise<any> {
    return this.httpClient.post<any>(this.baseUrl + 'login', pUser).toPromise();
  }

  logOut() {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_id');
    this.listasService.emptyNewList();
    this.listasService.showStarIcon(false)
    this.navbarService.showLogin(true);
    this.router.navigate(['/inicio']);
  }


}

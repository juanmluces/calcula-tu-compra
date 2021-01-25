import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string;



  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/users/';
  }

  createUser(pUser): Promise<any> {
    return this.httpClient
      .post<any>(this.baseUrl + 'create', pUser)
      .toPromise();
  }

  loginUser(pUser): Promise<any> {
    return this.httpClient.post<any>(this.baseUrl + 'login', pUser).toPromise();
  }
}

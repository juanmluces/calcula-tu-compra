import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/profile/';
  }

  getUserInfo(): Promise<any> {
    const body = {
      userid: localStorage.getItem('user_id')
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('user_token')
      })
    }

    return this.httpClient.post<any>(this.baseUrl, body, httpOptions).toPromise()
  }

  changeUserAvatar(pAvatar: string): Promise<any> {
    const body = {
      avatarUrl: pAvatar,
      userid: localStorage.getItem('user_id')
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('user_token')
      })
    }
    return this.httpClient.post<any>(this.baseUrl + 'avatar', body, httpOptions).toPromise()

  }

  createFavoriteList(pListId): Promise<any> {
    const body = {
      userid: localStorage.getItem('user_id'),
      listId: pListId
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('user_token')
      })
    }
    return this.httpClient.post<any>(this.baseUrl + 'newfavorite', body, httpOptions).toPromise();
  }

  removeFavoriteList(): Promise<any> {
    const body = {
      userid: localStorage.getItem('user_id'),
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('user_token')
      })
    }
    return this.httpClient.post<any>(this.baseUrl + 'removefavorite', body, httpOptions).toPromise();
  }

  searchByInput(pInput: string): Promise<any[]> {
    const body = {
      userid: localStorage.getItem('user_id'),
      searchText: pInput
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('user_token')
      })
    }
    return this.httpClient.post<any[]>(this.baseUrl + 'search', body, httpOptions).toPromise()
  }

  getSearchedList(pListId: number): Promise<Product[]> {
    const body = {
      userid: localStorage.getItem('user_id'),
      listId: pListId
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('user_token')
      })
    }

    return this.httpClient.post<Product[]>(this.baseUrl + 'getsearchedlist', body, httpOptions).toPromise()
  }

}



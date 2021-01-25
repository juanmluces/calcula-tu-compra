import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  newList: Product[];
  baseUrl: string;
  listHasItems$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {
    this.newList = [];
    this.baseUrl = 'http://localhost:3000/lists/';
  }

  showPlusIcon(pShowIcon: boolean) {
    this.listHasItems$.next(pShowIcon)
  }

  getPlusIconStatus$(): Observable<boolean> {
    return this.listHasItems$.asObservable();
  }

  addProductToList(pProduct: Product): void {
    this.showPlusIcon(true);
    const productInList = this.newList.find(product => product.id === pProduct.id);
    if (productInList) {
      productInList.cantidad += 1;
    } else {
      pProduct.cantidad = 1;
      this.newList.push(pProduct);
    }
  }

  saveNewList(pUserId, pNombreLista): Promise<any> {
    const formattedList = [];
    this.newList.forEach(product => {
      if (product.cantidad > 1) {
        for (let cantidad = 1; cantidad <= product.cantidad; cantidad++) {
          formattedList.push(product.id)
        }
      } else {
        formattedList.push(product.id)
      }
    })
    this.newList = [];

    const body = {
      "title": pNombreLista,
      "userid": pUserId,
      "products": formattedList
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('user_token')
      })
    }
    return this.httpClient.post(this.baseUrl + 'create', body, httpOptions).toPromise();
  }

  getNewList(): Product[] {
    return this.newList
  }

  getLastList(): Promise<any> {
    const body = {
      "userid": localStorage.getItem('user_id')
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('user_token')
      })
    }
    return this.httpClient.post<any>(this.baseUrl + 'last', body, httpOptions).toPromise()


  }

  removeProductNewList(pId: number, pAll: boolean = false): void {
    if (pAll) {
      const index = this.newList.findIndex(product => product.id === pId);
      this.newList.splice(index, 1);
    } else {
      const productToRemove = this.newList.find(product => product.id === pId);
      productToRemove.cantidad -= 1;
    }
  }

  emptyNewList(): void {
    this.showPlusIcon(false)
    this.newList = [];
  }

  calculateTotal(pProductList) {
    let result = 0;
    for (let product of pProductList) {
      result += (product.cantidad * product.precio)
    }
    return result
  }



}

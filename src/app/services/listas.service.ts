import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  newList: Product[];
  listHasItems$ = new Subject<boolean>();

  constructor() {
    this.newList = [];
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

  getNewList(): Product[] {
    return this.newList
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
}

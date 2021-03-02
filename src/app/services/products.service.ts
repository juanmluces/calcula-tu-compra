import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsObject } from '../interfaces/ProductsObject';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string;
  private categorySelected: number;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://calculatucompra.herokuapp.com/products/';
  }

  getAllProductsByPage(pPage: number): Promise<ProductsObject> {
    return this.httpClient.get<ProductsObject>(this.baseUrl + `page/${pPage}`).toPromise()
  }

  getAllProductsByCategoryByPage(pPage: number): Promise<ProductsObject> {
    console.log(this.categorySelected, pPage)
    return this.httpClient.get<ProductsObject>(this.baseUrl + `categoryid/${this.categorySelected}/page/${pPage}`).toPromise()
  }

  getProductsContainNameByPage(pName: string, pPage: number): Promise<ProductsObject> {
    return this.httpClient.get<ProductsObject>(this.baseUrl + `search/${pName}/page/${pPage}`).toPromise()
  }

  getAllCategories(): Promise<[any]> {
    return this.httpClient.get<[any]>(this.baseUrl + 'categories').toPromise();
  }

  selectCategory(pId: number) {
    this.categorySelected = pId;
  }

  getCategoryById(pId): Promise<string> {
    if (pId) {
      return this.httpClient.get<string>(this.baseUrl + `categories/${pId}`).toPromise();
    }

  }

  async getSelectedCategory() {
    try {
      const category = await this.getCategoryById(this.categorySelected);
      return category;
    } catch (error) {
      console.log(error)
    }
  }
}

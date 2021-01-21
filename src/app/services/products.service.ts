import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string;
  private categorySelected: number;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/products/';
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

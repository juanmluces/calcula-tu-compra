import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading$: Subject<boolean>  = new Subject()
  constructor() { }

  loader$(){
    return this.isLoading$.asObservable()
  }

  loadingTrue(){
    this.isLoading$.next(true)
  }

  loadingFalse(){
    this.isLoading$.next(false)
  }

}

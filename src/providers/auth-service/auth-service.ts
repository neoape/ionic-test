import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export class User {
  name: string
  email: string

  constructor(name: string, email: string) {
    this.name = name
    this.email = email
  }
}
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthServiceProvider {

  private currentUser: User

  login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials")
    } else {
      return Observable.create( observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Roma', 'romafaizov@gmail.com');
        observer.next(access);
        observer.complete();
      })
    }
  }

  register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials")
    } else { 
      return Observable.create( observer => {
        observer.next(true)
        observer.complete()
      })
    }
  }

  getUserInfo(): User {
    return this.currentUser
  }

  logout() {
    return Observable.create(observer => {
      this.currentUser = null
      observer.next(true)
      observer.complete()
    })
  }

}

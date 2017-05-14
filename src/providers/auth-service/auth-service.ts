import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export class User {
  name: string
  email: string
  password: string

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
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
  private users: Object[] = [
    {
      name: 'roma',
      email: '123@123.com',
      password: '123'
    },
    {
      name: 'test',
      email: 'test@test.com',
      password: 'test'
    }
  ]

  constructor() {
    if ("users" in localStorage) {
      return
    } else {
      let serialObj = JSON.stringify(this.users)
      localStorage.setItem('users', serialObj)
    }
  }

  login(credentials){
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials")
    } else {
      return Observable.create( observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Roma', 'romafaizov@gmail.com', '123');
        observer.next(access);
        observer.complete();
      })
    }
  }

  register(credentials) {
    if (credentials.email === null || credentials.password === null || credentials.name === null) {
      return Observable.throw("Please insert credentials")
    } else { 
      return Observable.create( observer => {
        this.addUser(credentials)
        this.setUsers()
        observer.next(true)
        observer.complete()
      })
    }
  }

  getUserInfo(): User {
    return this.currentUser
  }

  addUser(credentials) {
    let newUser = new User(credentials.name, credentials.email, credentials.password)
    this.users.push(newUser)
  }

  setUsers() {
    let serialObj = JSON.stringify(this.users)
    localStorage.setItem('users', serialObj)
  }

  logout() {
    return Observable.create(observer => {
      this.currentUser = null
      observer.next(true)
      observer.complete()
    })
  }

}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./globalConfig";


@Injectable()
export class UserService {
  public url: string;
  public identity: string | null
  public token: string | null
  constructor(
    public _http: HttpClient

  ) {
    this.url = global.url;
    this.identity = ''
    this.token = ''
  }

  test() {
    return "Salut le monde,d'un service"
  }

  register(user: any): Observable<any> {
    let json = JSON.stringify(user)
    let params = 'json=' + json

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    return this._http.post(this.url + 'register', params, { headers: headers })
  }

  login(user: any, getToken = false): Observable<any> {
    if (getToken != false) {
      user.getToken = 'true'
    }

    let json = JSON.stringify(user)
    let params = 'json=' + json
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    return this._http.post(this.url + 'login', params, { headers: headers })
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity') || '{}')

    if (identity && identity != 'undefined') {
      this.identity = identity
    } else {
      this.identity = null
    }
    return this.identity
  }
  getToken() {
    const token = localStorage.getItem('token')

    if (token && token != 'undefined') {
      this.token = token
    } else {
      this.token = null
    }
    return this.token
  }
}
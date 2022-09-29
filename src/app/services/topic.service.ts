import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { global } from "./globalConfig";


@Injectable()
export class TopicService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
  }

  create(token: any, topic: any): Observable<any> {
    let json = JSON.stringify(topic)
    let params = `json=${json}`

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token)

    return this._http.post(this.url + 'topics', params, { headers: headers })
  }

  getTopics(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    return this._http.get(this.url + 'topics', { headers: headers })
  }
}
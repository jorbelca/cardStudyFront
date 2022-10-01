import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global } from "./globalConfig";


@Injectable()
export class QuestionService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
  }
  test() {
    return 'Salutacions, des questions '
  }

  save(token: any, question: any): Observable<any> {
    let json = JSON.stringify(question)
    let params = "json=" + json

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token)


    return this._http.post(this.url + 'questions', params, { headers: headers })

  }

  getQuestions(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

    return this._http.get(this.url + 'questions', { headers: headers })
  }

}
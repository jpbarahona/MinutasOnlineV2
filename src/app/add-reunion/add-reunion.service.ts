import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Reunion } from './Reunion';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddReunionService {
  private headers = new Headers({'Content-Type': 'aplication/json'});
  private url     = 'http://localhost:8000/acta';
  
  constructor( private http:Http ) { }

  addReunion(reunion: Reunion){
    let url = `${this.url}`;
    let iJson = JSON.stringify(reunion);
    return this.http.post(url, iJson, {headers: this.headers})
               .map(r => r.json())
               .catch(this.handleError);
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if (error instanceof Response ){
      let body = error.json() || '';
      let err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || '' } ${err}`
    }else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
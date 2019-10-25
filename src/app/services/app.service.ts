import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import { globals } from '../config/globals';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class AppService {
  private loginUrl = globals.dbhosturl + 'login';
  private registerUrl = globals.dbhosturl + 'register';
  private _options = new RequestOptions({
    headers: new Headers({'Content-Type': 'application/json'}),
    withCredentials: true,
    params: {}
  });

  constructor (private _http: Http) {
  }

  login(username, email) {
    const login: Subject<any> = new Subject();
    const data = {'user': username, 'email': email};
    this._http.post(this.loginUrl, data)
              .subscribe(
                resp => {
                  login.next(resp.json());
                },
                err => {
                  console.log(err);
                  login.error(err);
                });

    return login;
  }

  register(username, email) {
    const register: Subject<any> = new Subject();
    const data = {'user': username, 'email': email};
    this._http.post(this.registerUrl, data)
              .subscribe(
                resp => {
                  register.next(resp.json());
                },
                err => {
                  console.log(err);
                  register.error(err);
                });

    return register;
  }
}

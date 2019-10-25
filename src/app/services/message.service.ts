import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { globals } from '../config/globals';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import * as _ from "lodash";

import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {
  private _configUrl = globals.dbhosturl;
  private socket;
  private _options = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/json' }),
    withCredentials: true
  })

  constructor(private _http: Http) {
    this._http = _http;
  }

  sendMessage(message, name) {
    const data = {'message': message, 'name': name};
    this.socket.emit('add-message', data);
  }

  updateUser(user) {
    this.socket.emit('update-user', user);
  }

  sendProfile(id) {
    this.socket.emit('get-profile', id);
  }

  getMessages(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket = io(this._configUrl);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket = io(this._configUrl);
      this.socket.on('users', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getProfile(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket = io(this._configUrl);
      this.socket.on('profile', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

}

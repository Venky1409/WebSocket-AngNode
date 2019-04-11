import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import * as _ from "lodash";

import 'rxjs/add/operator/map';

@Injectable()
export class MessageService {
  private _configUrl = "http://localhost:1409";  // URL to web API
  private socket;
  private _options = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/json' }),
    withCredentials: true
  })

  constructor(private _http: Http) {
    this._http = _http;
  }

  sendMessage(message) {
    this.socket.emit('add-message', message);
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

}

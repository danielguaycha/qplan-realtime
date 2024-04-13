import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class webSocketService {
  private webSocket: Socket;

  constructor() {
    this.webSocket = new Socket({
      url: environment.server,
      options: {},
    });
  }

  // this method is used to start connection/handhshake of socket with server
  connectSocket(message: string) {
    this.webSocket.emit('message', message);
  }

  // this method is used to get response from server
  receiveStatus(): Observable<Object> {
    return this.webSocket.fromEvent<string>('updated-friend')
      .pipe(
        map(event => JSON.parse(event))
      );
  }

  // this method is used to end web socket connection
  disconnectSocket() {
    this.webSocket.disconnect();
  }
}

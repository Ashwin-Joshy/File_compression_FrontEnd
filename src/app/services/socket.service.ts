import { Injectable } from '@angular/core';
//import { Socket } from 'ngx-socket-io';
import { io,Socket } from 'socket.io-client';
//import * as io from 'socket.io-client';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket
  constructor() {  
     this.socket = io(environment.socketUrl);
  }
  sendMessage(msg: string,data:any) {
    console.log(this.socket);
    this.socket.emit('start', data);
    console.log('send');
  }
  getMessage() {
    // return this.socket.fromEvent('chat').pipe(
    //   map((data) => {
    //     console.log(data);
    //   })
    // );
  }
  listenToServer(): Observable<any>{
    return new Observable((subscribe)=>{
      this.socket.on("chat", (data:any)=>{
        console.log(data);
        
        subscribe.next(data);
      });
    })
  }
  // emitToServer(connection:Connection, data:any){
  //   this.clientSocket.emit(connection, data);
  // }

  // setupSocketConnection() {
  //  // this.socket = io(environment.socketUrl);
  // }
  // chat(message: string) {
  //   //this.socket.emit('chat', message);
  //   this.socket.emit('chat');
  // }
  // disconnect() {
  //   if (this.socket) {
  //     console.log('disconnecting');

  //    // this.socket.disconnect();
  //   }
  // }

  // emit event
  // fetchMovies(msg: any) {
  //   this.socket.emit('chat', msg);
  // }
  // // listen event

  // onFetchMovies() {
  //   return this.socket.fromEvent('chat');
  // }
}

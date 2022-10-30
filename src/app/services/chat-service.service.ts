import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SocketService } from './socket.service';


@Injectable()
export class ChatService {


  // Our constructor calls our wsService connect method
  constructor(private wsService: SocketService) {}


}
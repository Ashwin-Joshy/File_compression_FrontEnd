import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 temp55:any=0
  title = 'zipfile';
  // constructor(private socketService: SocketService ) {
  //   this.socketService.listenToServer(Connnection.change).subscribe((change)=>{
  //     console.log(change);
      
  //   })
  //   this.socketService.listenToServer(Connnection.create).subscribe((user)=>{
  //     console.log(user);
      
  //   })
  //  }
}

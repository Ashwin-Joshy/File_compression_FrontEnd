import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  movies: any;
  submitForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    fromdate: new FormControl(''),
    todate: new FormControl(''),
    zipname: new FormControl(''),
  });
  constructor(private socketService: SocketService, formGroup: FormBuilder) {}

  ngOnInit(): void {
    this.socketService.listenToServer().subscribe((data) => {
      console.log(data);
      this.movies = data;
    });
  }
  ngOnDestroy(): void {}
  submit() {
    console.log(this.submitForm);
    this.movies='Processing';
    this.socketService.sendMessage('start', this.submitForm.value);
  }
  set() {
    //this.socketService.sendMessage('start');
  }
  unset() {
    console.log(this.submitForm);
  }
  onClick(): void {
    //this.socketService.chat('hello');
  }
}

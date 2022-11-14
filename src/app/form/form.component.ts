import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fa8,
  faCheck,
  faEye,
  faPenToSquare,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  //font awesome icons
  faTrash = faTrash;
  faEdit = faPenToSquare;
  faEye = faEye;
  fa8 = fa8;
  faCheck = faCheck;
  faCross = faXmark;

  //The status display variable
  movies: any;

  //Taking data from form
  submitForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    fromdate: new FormControl(''),
    todate: new FormControl(''),
    zipname: new FormControl(''),
  });
  fromTooltop: boolean = false;
  toToolTop: boolean = false;
  fromPath: Array<string> = [];
  toPath: Array<string> = [];
  edit: Array<any> = [null, false, ''];

  title = 'appBootstrap';
   
  closeResult: string = '';
  constructor(
    private socketService: SocketService,
    formGroup: FormBuilder,
    library: FaIconLibrary,
    private modalService: NgbModal
  ) {
    library.addIcons(fa8, faCheck);
  }

  ngOnInit(): void {
    this.socketService.listenToServer().subscribe((data) => {
      console.log(data);
      this.movies = data;
    });
  }
  ngOnDestroy(): void {}
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //To add new path to array
  addToArray(arrayName: string, element: HTMLInputElement) {
    let value = element.value;
    if (arrayName == 'from') {
      this.processArray( value, this.fromPath );
    }
    if(arrayName == 'to'){
      this.processArray( value, this.toPath );
    }
    element.value = '';
    this.showMessage('Added to list');
  }
  //To process different paths we assign another function for avoiding code duplication
  processArray(value: string, path: Array<string>) {
    
    let splitValue = value.split(',');
    if (splitValue.length > 1) {
      for (let i = 0; i < splitValue.length; i++) {
        //Checking for occurences of comma only, not path eg: ["path",",","path"]
        if (splitValue[i] != '') {
          path.push(splitValue[i]);
        }
      }
    } else if (value != '') {
      value = value.replace(/,/g, '');
      path.push(value);
    }
  
  }
  showMessage(message: string) {
    this.movies = message;
    let temp=message
    setTimeout(() => {
      this.movies ==temp?this.movies = '':null;
    }, 3000);
  }
 //To show the edit input tag (To satisfy condtions to show specific input tag)
  editFromArray(arrayName: string, index: number) {
    if (arrayName == 'from') {
      this.edit = [index, true, 'from'];
    }
    if (arrayName == 'to') {
      this.edit = [index, true, 'to'];
    }
  }
  //To apply specific changes to the array
  applyToArray(arrayName: string, index: number, value: string) {
    if (value == '') {
      this.edit = [null, false, ''];
      return;
    }
    if (arrayName == 'from') {
      this.fromPath[index] = value;
      this.edit = [null, false, ''];
    }
    if (arrayName == 'to') {
      this.toPath[index] = value;
      this.edit = [null, false, ''];
    }
    this.showMessage('Updated');
  }
  //To remove specific element from array
  deleteFromArray(arrayName: string, index: number) {

    if (arrayName == 'from') {
      this.fromPath.splice(index, 1);
    }
    if (arrayName == 'to') {
      this.toPath.splice(index, 1);
    }

    this.showMessage('Deleted');
  }
  changeTooltip(tooltip: string) {
    if (tooltip == 'from') {
      this.fromTooltop = !this.fromTooltop;
    }
    if (tooltip == 'to') {
      this.toToolTop = !this.toToolTop;
    }
  }
  //To send the data to the server
  submit() {
    let data:any={...this.submitForm.value}
    data.from=this.fromPath;
    data.to=this.toPath;
    console.log(data);
    this.movies = 'Connecting to server';
    this.socketService.sendMessage('start', data);
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

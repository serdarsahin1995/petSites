import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../services/userService/user.service';
import { FileUpload} from '../fileupload';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  adverts:any
  @Input () fileUpload: FileUpload;

  constructor(public user: UserService) { }

  ngOnInit() {
    
    this.user.getAllAdverts().subscribe(adverts => this.adverts = adverts);
    console.log(this.adverts)

  }

}

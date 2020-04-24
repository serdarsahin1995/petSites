import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/userService/user.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  adverts:any

  constructor(public user: UserService) { }

  ngOnInit() {
    this.user.getAllAdverts().subscribe(adverts => this.adverts = adverts);
    console.log(this.adverts)

  }

}

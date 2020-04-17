import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-be-petsitter',
  templateUrl: './be-petsitter.component.html',
  styleUrls: ['./be-petsitter.component.css']
})
export class BePetsitterComponent implements OnInit {

  constructor(private us:UserService,private afAuth: AngularFireAuth,private db:AngularFireDatabase) { }

  ngOnInit() {
  }
  bePetsitter(metin){
    this.afAuth.user.subscribe(user=>this.us.bePetsitter(metin,user))
  }
}

import { Component, OnInit } from '@angular/core';
import {UserService } from '../../services/userService/user.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-own-pet',
  templateUrl: './own-pet.component.html',
  styleUrls: ['./own-pet.component.css']
})
export class OwnPetComponent implements OnInit {
  userTemp:any;
  temp:any;
  cins:any;
  Cinsiyet:any;
  Sehir:any;
  ilanAciklamasi:any;
  yas:any;

  constructor(private us : UserService,private afAuth: AngularFireAuth,private db:AngularFireDatabase) { }

  ngOnInit() {

    this.us.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
    this.afAuth.user.subscribe(user=>this.us.getOwnPet(user).subscribe(m=>this.temp=m));
    console.log(this.temp)
   
  }

}

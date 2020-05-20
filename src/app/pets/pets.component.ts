import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../services/userService/user.service';
import { FileUpload} from '../fileupload';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  adverts:any
  @Input () fileUpload: FileUpload;
  userTemp:firebase.User
  petS:boolean=false;

  constructor(public user: UserService,private db:AngularFireDatabase) { }

  ngOnInit() {
    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
    this.user.getAllAdverts().subscribe(adverts => this.adverts = adverts);
    console.log(this.adverts)
    this.db.list('/Petsitters/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.petS=true;
       }     
     });
    });
  }

}

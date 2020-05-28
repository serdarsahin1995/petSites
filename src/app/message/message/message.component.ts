import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/userService/user.service'
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  userTemp:any
  admin:boolean=false;
  petOwn:boolean=false;
  Petsitters:boolean=false;
  constructor(public user: UserService,private db:AngularFireDatabase) { }

  ngOnInit() {
    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
    this.db.list('/admin/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.admin=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });
    });
    this.db.list('/petOwn/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.petOwn=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });
    });
    this.db.list('/Petsitters/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.Petsitters=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router'
import { UserService} from '../../services/userService/user.service'
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  data:any;
  rol:any;

  constructor(private afAuth: AngularFireAuth ,private db:AngularFireDatabase,private us:UserService,private router:Router) { }

  ngOnInit() {
  }
  kisiler(key){
    if(key=="yonetici"){
      this.us.getAdmin().subscribe(a=>this.data=a);
      this.rol=key
    }
    if(key=="bakıcılar"){
      this.us.getAllpetSitters().subscribe(a=>this.data=a);
      this.rol=key
    }
    if(key=="hayvan sahibleri"){
      this.us.getAllPetOwners().subscribe(a=>this.data=a);
      this.rol=key
    }
  }
  onSubmit(key){
    this.us.messageSend(key,this.rol)
  }

}

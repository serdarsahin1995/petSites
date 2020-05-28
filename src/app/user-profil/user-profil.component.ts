import { Component, OnInit, Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router'
import { UserService} from '../services/userService/user.service'
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})

export class UserProfilComponent implements OnInit {
  dataCourses: any;
  id:any;
  email:any
  userTemp:firebase.User
admin:boolean=false;
ogrencisleri:boolean=false;
ogrenci:boolean=false;
ogretmen:boolean=false;
  constructor(private afAuth: AngularFireAuth ,private db:AngularFireDatabase,private user:UserService,private router:Router) { }

  ngOnInit() {
    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
  
    
    
    
  }
  Edit(row)
{
this.id=row.key

this.email=row.email
console.log(this.email)
this.user.editProfil(row,this.id)
this.router.navigate(['editProfil'])
}

}

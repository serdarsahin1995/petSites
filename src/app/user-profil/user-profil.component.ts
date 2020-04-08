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
    this.db.list('/ogrenciIsleri/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.ogrencisleri=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });
  
    });
    this.db.list('/ogrenci/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.ogrenci=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });
  
    });
    this.db.list('/ogretmen/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.ogretmen=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });
  
    });
    
    
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

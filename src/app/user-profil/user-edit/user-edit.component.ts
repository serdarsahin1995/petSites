import { Component, OnInit, ViewChild } from '@angular/core';
import {UserService } from '../../services/userService/user.service'
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
declare let alertify:any;
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editForm:FormGroup;
  email:any
  name:any;
  id:any;
  userTemp:firebase.User
admin:boolean=false;
ogrencisleri:boolean=false;
ogrenci:boolean=false;
  constructor( private user:UserService, private fb:FormBuilder,private db:AngularFireDatabase,private router:Router) { 
    this.editForm= this.fb.group({
      'studentName':[null,Validators.required]
      })

  }

  ngOnInit() {
    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
  this.name=this.user.temp.name
  this.email=this.user.temp.email
  this.id=this.user.editId
  console.log(this.name)
  console.log(this.email)
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
  
  }


  

}

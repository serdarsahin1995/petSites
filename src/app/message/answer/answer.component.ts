import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../../services/userService/user.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  id:any
  regiForm:FormGroup;
  userTemp:firebase.User
  newdate :string;
  time:any;
  petsitter:any;
  petOwn:any;
constructor(public user: UserService,private db:AngularFireDatabase, private fb:FormBuilder,private afAuth: AngularFireAuth) {
  this.regiForm= this.fb.group({
    
    'baslık' :[null,Validators.required],
    'yazı':[null,Validators.required],
    
    })
 }

 ngOnInit() {
  this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
  this.id=this.user.messageId

  var dateObj = new Date();
  var month = ("0" + (dateObj.getMonth() + 1)).slice(-2); //months from 1-12
  var day = ("0" + dateObj.getDate()).slice(-2)
  var year = dateObj.getFullYear();
  var currentdate = new Date();
   this.time =  currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();

 
   this.newdate = year + "-" + month + "-" + day;
   console.log(this.newdate)
   this.db.list('/Petsitters/').snapshotChanges().subscribe(items=>{
    items.forEach(values => {
     let key = values.key;
     if(this.afAuth.auth.currentUser.uid==key){
       this.petsitter=true;
       this.user.rola("bakıcı")
     }     
   });
  });
  this.db.list('/petOwn/').snapshotChanges().subscribe(items=>{
    items.forEach(values => {
     let key = values.key;
     if(this.afAuth.auth.currentUser.uid==key){
      this.petOwn=true;
       this.user.rola("hayvansahibi")
     }     
   });
  });
}
onSubmit(from){
  console.log(from)
  if(this.regiForm.valid){
    this.user.answer2(this.id,from.baslık,from.yazı,this.newdate,this.time,this.userTemp);
  }
}

}

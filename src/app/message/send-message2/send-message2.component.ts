import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../../services/userService/user.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-send-message2',
  templateUrl: './send-message2.component.html',
  styleUrls: ['./send-message2.component.css']
})
export class SendMessage2Component implements OnInit {
  id:any
  regiForm:FormGroup;
  userTemp:firebase.User
  newdate :string;
  time:any;

  constructor(public user: UserService,private db:AngularFireDatabase, private fb:FormBuilder) {
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
  }
  onSubmit(from){
    console.log(from)
    if(this.regiForm.valid){
      this.user.sendMessage2(this.id,from.baslık,from.yazı,this.newdate,this.time);
    }
  }

}
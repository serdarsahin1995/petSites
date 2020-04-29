import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
  regiForm:FormGroup;
  evForm:FormGroup
  userTemp:firebase.User
  adverts:any
  constructor(public user: UserService, private fb:FormBuilder,private db:AngularFireDatabase) {
    this.regiForm= this.fb.group({
      'isim':[null,Validators.required],
      'sehir':[null,Validators.required],
      'yas':[null,Validators.required],
      'hakkinda':[null,Validators.required],
      })
      this.evForm= this.fb.group({
        'mesken':[null,Validators.required],
        'bahce':[null,Validators.required],
        'oda':[null,Validators.required],
        'baskapet':[null,Validators.required],
        'sigara':[null,Validators.required],
        })

   }

  ngOnInit() {
    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
  }
  onSubmit(from){
    console.log(this.userTemp.uid)
    if(this.regiForm.valid){
      this.user.kisiselBilgi(from.isim,from.sehir,from.yas,from.hakkinda,this.userTemp);
      
    }
  }
  onSubmit2(from){
    console.log(this.userTemp.uid)
    if(this.evForm.valid){
      this.user.evBilgi(from.mesken,from.bahce,from.oda,from.baskapet,from.sigara,this.userTemp);
      
    }
  }
}

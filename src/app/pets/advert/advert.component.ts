import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../../services/userService/user.service';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnInit {
  regiForm:FormGroup;
  userTemp:firebase.User
  adverts:any

  constructor(public user: UserService, private fb:FormBuilder,private db:AngularFireDatabase) {
    this.regiForm= this.fb.group({
      'Cinsi':[null,Validators.required],
      'Cinsiyet':[null,Validators.required],
      'yas':[null,Validators.required],
      'Sehir':[null,Validators.required],
      'ilanAciklamasi':[null,Validators.required],
      })
   }

  ngOnInit() {

    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
    
  }
  onSubmit(from){
    console.log(this.userTemp.uid)
    if(this.regiForm.valid){
      this.user.addAdvert(from.Cinsi,from.Cinsiyet,from.yas,from.Sehir,from.ilanAciklamasi,this.userTemp);
      
    }

  }
  

}

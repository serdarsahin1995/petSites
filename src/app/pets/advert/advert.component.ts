import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../../services/userService/user.service';
import {FileUpload} from '../../fileupload';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnInit {
  regiForm:FormGroup;
  userTemp:firebase.User;
  adverts:any;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

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
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    if(this.regiForm.valid){
      this.user.pushFileToStorage(this.currentFileUpload, this.progress,this.userTemp,from.Cinsi,from.Cinsiyet,from.yas,from.Sehir,from.ilanAciklamasi);
    }
   

  }
  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }
  
  

}

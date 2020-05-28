import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from '../../services/userService/user.service';
import {FileUpload} from '../../fileupload';

@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.css']
})
export class EditAdvertComponent implements OnInit {
  regiForm:FormGroup;
  userTemp:firebase.User;
  adverts:any;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  Uid:any;
  cinsi:any
  userGel:any
  cinsiyet:any
  sehir:any
  ilanAciklamasi:any
  yas:any

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
    this.userGel=this.user.userT
    this.Uid=this.user.editAdvertId;
    console.log(this.userGel)
    console.log(this.Uid)
    this.db.object('/petOwn/' + this.userGel + "/Adverts/"+ this.Uid +"/Cinsi").snapshotChanges().subscribe(c=>{this.cinsi=c.payload.val()})
    this.db.object('/petOwn/' + this.userGel + "/Adverts/"+ this.Uid +"/Cinsiyet").snapshotChanges().subscribe(c=>{this.cinsiyet=c.payload.val()})
    this.db.object('/petOwn/' + this.userGel + "/Adverts/"+ this.Uid +"/Sehir").snapshotChanges().subscribe(c=>{this.sehir=c.payload.val()})
    this.db.object('/petOwn/' + this.userGel + "/Adverts/"+ this.Uid +"/ilanAciklamasi").snapshotChanges().subscribe(c=>{this.ilanAciklamasi=c.payload.val()})
    this.db.object('/petOwn/' + this.userGel + "/Adverts/"+ this.Uid +"/yas").snapshotChanges().subscribe(c=>{this.yas=c.payload.val()})
    console.log(this.cinsi)
  }
  onSubmit(from){
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    if(this.regiForm.valid){
      this.user.pushFileToStorageEdit(this.currentFileUpload, this.progress,this.userTemp,from.Cinsi,from.Cinsiyet,from.yas,from.Sehir,from.ilanAciklamasi);
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

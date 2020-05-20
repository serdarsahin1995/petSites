import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import {FileUpload} from '../../fileupload';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
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
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  constructor(public user: UserService, private fb:FormBuilder,private db:AngularFireDatabase,public auth:AngularFireAuth) {
    this.regiForm= this.fb.group({
      'isim':[null,Validators.required],
      'sehir':[null,Validators.required],
      'yas':[null,Validators.required],
      'hakkinda':[null,Validators.required,],
      'gecelik':[null,Validators.required,],
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
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/hakkında").snapshotChanges().subscribe(c=>this.regiForm.get('hakkinda').setValue(c.payload.val())));
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/gecelik").snapshotChanges().subscribe(c=>this.regiForm.get('gecelik').setValue(c.payload.val())));
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/name").snapshotChanges().subscribe(c=>this.regiForm.get('isim').setValue(c.payload.val())));
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/adress").snapshotChanges().subscribe(c=>this.regiForm.get('sehir').setValue(c.payload.val())));
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/yas").snapshotChanges().subscribe(c=>this.regiForm.get('yas').setValue(c.payload.val())));
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/evBilgi/bahce").snapshotChanges().subscribe(c=>this.evForm.get('bahce').setValue(c.payload.val())));
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/evBilgi/mesken").snapshotChanges().subscribe(c=>this.evForm.get('mesken').setValue(c.payload.val())));
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/evBilgi/oda").snapshotChanges().subscribe(c=>this.evForm.get('oda').setValue(c.payload.val())));
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/evBilgi/baskapet").snapshotChanges().subscribe(c=>this.evForm.get('baskapet').setValue(c.payload.val())));
    this.user.getCurrentUser().subscribe(userTemp=>this.db.object('/Petsitters/' + userTemp.uid + "/evBilgi/sigara").snapshotChanges().subscribe(c=>this.evForm.get('sigara').setValue(c.payload.val())));
    
  }
  onSubmit(from){
    if(this.regiForm.valid){
      this.user.kisiselBilgi(from.isim,from.sehir,from.yas,from.hakkinda,from.gecelik,this.userTemp);
      
    }
  }
  onSubmit2(from){
    console.log(this.userTemp.uid)
    if(this.evForm.valid){
      this.user.evBilgi(from.mesken,from.bahce,from.oda,from.baskapet,from.sigara,this.userTemp);
      
    }
  }
  upload(path){
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.user.pushStorage(this.currentFileUpload, this.progress,path);

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

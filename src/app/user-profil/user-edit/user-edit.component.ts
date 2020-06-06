import { Component, OnInit, ViewChild } from '@angular/core';
import {UserService } from '../../services/userService/user.service'
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
declare let alertify:any;
import { Router} from '@angular/router';
import {FileUpload} from '../../fileupload';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  private basePath = '/uploads';
  constructor( private user:UserService, private fb:FormBuilder,private db:AngularFireDatabase,private router:Router) { 
  }
  ngOnInit() {
 
  }


  upload(){
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.pushStorage(this.currentFileUpload, this.progress);

  }
  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }
  pushStorage(fileUpload: FileUpload, progress: { percentage: number }){
    const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      // in progress
      const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
    },
    (error) => {
      // fail
      console.log(error);
    },
    () => {
      // success
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log('File available at', downloadURL);
        fileUpload.url = downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveImagetoDatabase(fileUpload);
      });
    }
  );
  }
  saveImagetoDatabase(fileUpload: FileUpload,){
    
      this.db.object(`petOwn/`+firebase.auth().currentUser.uid+'/').update({image:fileUpload.url});
   
}
changeProfilInfo(namee){
  this.db.object(`petOwn/`+firebase.auth().currentUser.uid+'/').update({name:namee});
  alertify.success("Profil Güncellendi");
}
}

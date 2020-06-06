import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/userService/user.service'
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  userTemp:any;
  data:any;
  rol:any;
  constructor(private us : UserService,private afAuth: AngularFireAuth,private db : AngularFireDatabase) { }

  ngOnInit() {
    this.us.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp.email);
  }
  kisiler(key){
    if(key=="yonetici"){
      this.us.getAdmin().subscribe(a=>this.data=a);
      this.rol=key
    }
    if(key=="bakıcılar"){
      this.us.getAllpetSitters().subscribe(a=>this.data=a);
      this.rol=key
    }
    if(key=="hayvan sahibleri"){
      this.us.getAllPetOwners().subscribe(a=>this.data=a);
      this.rol=key
    }
  }
  remove(key){  
    if(window.confirm('Kişiyi silmek istediğinize enim misiniz?')){
      this.us.remove(key,this.rol)
    }
  
  }

}

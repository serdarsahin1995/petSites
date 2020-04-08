import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/userService/user.service'
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.css']
})
export class MyProfilComponent implements OnInit {
userTemp:any;
message:any;
mdetail:any;
mdetail2:any;
mdetail3:any;
listFalse:Array<any>;
count = 0;
bildirim =0;
  constructor(private us : UserService,private afAuth: AngularFireAuth) { 
    
  }

  ngOnInit() {
    
    this.us.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp.email);
    this.afAuth.user.subscribe(user => this.us.getMessage(user).subscribe(m => this.message=m));

    this.listFalse = []

    this.afAuth.user.subscribe(user => this.us.getMessage(user).subscribe(detail => {detail.forEach(c=>{
      this.listFalse.push(c)
    }
    );this.listFalse.map(item=> { if(item.boolean === false){ console.log(item)
      this.count++}this.bildirim=this.count});
      this.listFalse=[]
     this.count=0;}));
    
  }
  getMesDetail(mId){
    
    this.afAuth.user.subscribe(user => this.us.getMdetail(user,mId).subscribe(m => {this.mdetail=m,this.mdetail2=m[0],this.mdetail3=m[1]}));
    this.afAuth.user.subscribe(user => this.us.messageTF(user,mId));
  }

}

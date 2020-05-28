import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/userService/user.service'
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-get-message',
  templateUrl: './get-message.component.html',
  styleUrls: ['./get-message.component.css']
})
export class GetMessageComponent implements OnInit {
  userTemp:any;
message:any;
mdetail:any;
mdetail2:any;
mdetail3:any;
listFalse:Array<any>;
count = 0;
bildirim =0;
res:any;
resArray:Array<any>;
result:any ; result2:Array<any>;
petOwn:any;
rol:any
  constructor(private us : UserService,private afAuth: AngularFireAuth,private db : AngularFireDatabase) { }

  ngOnInit() {
    this.us.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
   
   
    this.afAuth.user.subscribe(user => this.us.getMessage(user).subscribe(m => this.message=m));

    this.listFalse = []
    
    
    this.afAuth.user.subscribe(user => this.us.getMessage(user).subscribe(detail => {detail.forEach(c=>{
      this.listFalse.push(c)
    }
    );this.listFalse.map(item=> { if(item.boolean === false){ 
      this.count++}this.bildirim=this.count});
      this.listFalse=[]
     this.count=0;}));


    this.resArray=[]
    this.result2=[]
  }
  getMesDetail(mId){
    
    this.afAuth.user.subscribe(user => this.us.getMdetail(user,mId).subscribe(m => {this.mdetail=m,this.mdetail2=m[0],this.mdetail3=m[1]}));
    this.afAuth.user.subscribe(user => this.us.messageTF(user,mId));
  }

}

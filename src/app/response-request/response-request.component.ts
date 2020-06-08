import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService/user.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-response-request',
  templateUrl: './response-request.component.html',
  styleUrls: ['./response-request.component.css']
})
export class ResponseRequestComponent implements OnInit {
  requests:any;
  gBilgi:any;
  newdate :string;
  time:any;
  petOwnimage:any
  constructor(private us:UserService,private db :AngularFireDatabase) { }

  ngOnInit() {
    this.us.getAllrequest().subscribe(requests => this.requests = requests);
  }
  getbilgi(uid){
     this.db.object('/requestBeSitter/' + uid + "/bilgi").snapshotChanges().subscribe(c=>{this.gBilgi=c.payload.val()})
  }
  bePetsitter(uid,name,email){
    var dateObj = new Date();
    var month = ("0" + (dateObj.getMonth() + 1)).slice(-2); //months from 1-12
    var day = ("0" + dateObj.getDate()).slice(-2)
    var year = dateObj.getFullYear();
    var currentdate = new Date();
     this.time =  currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();

   
     this.newdate = year + "-" + month + "-" + day;
    this.us.applyBePetsitter(uid,name,email,this.time,this.newdate)
  }
  reddet(uid){
    this.us.reddet(uid)
  }
}

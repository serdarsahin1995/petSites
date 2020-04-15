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

  constructor(private us:UserService,private db :AngularFireDatabase) { }

  ngOnInit() {
    this.us.getAllrequest().subscribe(requests => this.requests = requests);
  }
  getbilgi(uid){
     this.db.object('/requestBeSitter/' + uid + "/bilgi").snapshotChanges().subscribe(c=>{this.gBilgi=c.payload.val()})
  }
  bePetsitter(uid,name){
    this.us.applyBePetsitter(uid,name)
  }
}

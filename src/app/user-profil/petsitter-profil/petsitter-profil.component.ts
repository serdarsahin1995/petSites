import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-petsitter-profil',
  templateUrl: './petsitter-profil.component.html',
  styleUrls: ['./petsitter-profil.component.css']
})
export class PetsitterProfilComponent implements OnInit {
sitter:any;
sitterUid:any;
hakkinda:any;
name:any;
model: NgbDateStruct;
model2: NgbDateStruct;
userName:any;
  constructor(private us:UserService,private db :AngularFireDatabase,private afAuth: AngularFireAuth,private parserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {
   this.sitterUid = this.us.getpetS()
   this.db.object('/Petsitters/' + this.sitterUid + "/hakkında").snapshotChanges().subscribe(c=>{this.hakkinda=c.payload.val()})
   this.db.object('/Petsitters/' + this.sitterUid + "/name").snapshotChanges().subscribe(c=>{this.name=c.payload.val()})
   this.db.object('/users/' + firebase.auth().currentUser.uid + "/name").snapshotChanges().subscribe(c=>{this.userName=c.payload.val()})
  }
  reservation(){
    this.db.object('/Petsitters/'+this.sitterUid+'/reservations/'+firebase.auth().currentUser.uid).update({
      startDate:this.parserFormatter.format(this.model),
      endDate: this.parserFormatter.format(this.model2),
      name:this.userName
})
  }
  
  
}

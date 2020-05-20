import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import * as moment from 'moment';

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
profilPhoto:any;
evPhoto:any;

mesken:any;bahce:any;baskapet:any;oda:any;sigara:any;
  constructor(private us:UserService,private db :AngularFireDatabase,private afAuth: AngularFireAuth,private parserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {
   this.sitterUid = this.us.getpetS()
   this.db.object('/Petsitters/' + this.sitterUid + "/hakkında").snapshotChanges().subscribe(c=>{this.hakkinda=c.payload.val()})
   this.db.object('/Petsitters/' + this.sitterUid + "/name").snapshotChanges().subscribe(c=>{this.name=c.payload.val()})
   this.db.object('/petOwn/' + firebase.auth().currentUser.uid + "/name").snapshotChanges().subscribe(c=>{this.userName=c.payload.val()})
   this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/mesken").snapshotChanges().subscribe(c=>{this.mesken=c.payload.val()})
   this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/bahce").snapshotChanges().subscribe(c=>{this.bahce=c.payload.val()})
   this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/oda").snapshotChanges().subscribe(c=>{this.oda=c.payload.val()})
   this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/sigara").snapshotChanges().subscribe(c=>{this.sigara=c.payload.val()})
   this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/baskapet").snapshotChanges().subscribe(c=>{this.baskapet=c.payload.val()})
   this.db.object('/Petsitters/' + this.sitterUid + "/imageUrl").snapshotChanges().subscribe(c=>{this.profilPhoto=c.payload.val()})
   this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/imageUrl").snapshotChanges().subscribe(c=>{this.evPhoto=c.payload.val()})
  }
  reservation(tur,cins,yas){
   let date1:moment.Moment=moment(this.parserFormatter.format(this.model));
let date2:moment.Moment=moment(this.parserFormatter.format(this.model2));
let gece=date2.diff(date1, 'days')
    this.db.object('/Petsitters/'+this.sitterUid+'/reservations/'+firebase.auth().currentUser.uid).update({
      startDate:this.parserFormatter.format(this.model),
      endDate: this.parserFormatter.format(this.model2),
      name:this.userName,
      tur:tur,
      cins:cins,
      yas:yas,
      gece:gece
      
})
  }
  
  
}

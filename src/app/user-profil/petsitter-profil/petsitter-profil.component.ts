import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgbDateStruct, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import * as moment from 'moment';
declare let alertify: any;

@Component({
  selector: 'app-petsitter-profil',
  templateUrl: './petsitter-profil.component.html',
  styleUrls: ['./petsitter-profil.component.css']
})
export class PetsitterProfilComponent implements OnInit {
  sitter: any;
  sitterUid: any;
  hakkinda: any;
  name: any;
  model: NgbDateStruct;
  model2: NgbDateStruct;
  userName: any;
  profilPhoto: any;
  evPhoto: any;
  minD: NgbDateStruct;
  minD2: NgbDateStruct;
  takvim: any
  petPhoto: any
  petName: any
  petCinsiyet: any
  adress: any

  mesken: any; bahce: any; baskapet: any; oda: any; sigara: any;
  constructor(private us: UserService, private db: AngularFireDatabase, private parserFormatter: NgbDateParserFormatter, private calander: NgbCalendar, private afAuth: AngularFireAuth) {
    this.minD = this.calander.getToday();
  }

  ngOnInit() {
    this.us.takvimPetsitter2().subscribe(t => this.takvim = t);
    this.sitterUid = this.us.c()
    this.db.object('/Petsitters/' + this.sitterUid + "/imageUrl").snapshotChanges().subscribe(c => { this.profilPhoto = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/imageUrl").snapshotChanges().subscribe(c => { this.evPhoto = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/hakkında").snapshotChanges().subscribe(c => { this.hakkinda = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/name").snapshotChanges().subscribe(c => { this.name = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/mesken").snapshotChanges().subscribe(c => { this.mesken = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/bahce").snapshotChanges().subscribe(c => { this.bahce = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/oda").snapshotChanges().subscribe(c => { this.oda = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/sigara").snapshotChanges().subscribe(c => { this.sigara = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/evBilgi/baskapet").snapshotChanges().subscribe(c => { this.baskapet = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/petBilgi/imageUrl").snapshotChanges().subscribe(c => { this.petPhoto = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/petBilgi/petismi").snapshotChanges().subscribe(c => { this.petName = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/petBilgi/cinsiyeti").snapshotChanges().subscribe(c => { this.petCinsiyet = c.payload.val() })
    this.db.object('/Petsitters/' + this.sitterUid + "/adress").snapshotChanges().subscribe(c => { this.adress = c.payload.val() })
    this.db.object('/users/' + this.afAuth.auth.currentUser.uid + "/name").snapshotChanges().subscribe(c => { this.userName = c.payload.val() })



  }
  reservation(tur, cins, yas) {

    let date1: moment.Moment = moment(this.parserFormatter.format(this.model));
    let date2: moment.Moment = moment(this.parserFormatter.format(this.model2));
    let gece = date2.diff(date1, 'days')
    if (gece == 0) {
      gece = gece + 1;
    }
    this.db.object('/Petsitters/' + this.sitterUid + '/reservations/' + firebase.auth().currentUser.uid).update({
      startDate: this.parserFormatter.format(this.model),
      endDate: this.parserFormatter.format(this.model2),
      name: this.userName,
      tur: tur,
      cins: cins,
      yas: yas,
      gece: gece,
      email: this.afAuth.auth.currentUser.email

    })
    alertify.success("Rezervasyon isteğini başarılı!");
  }
  onDateSelection() {
    this.minD2 = this.model
  }


}

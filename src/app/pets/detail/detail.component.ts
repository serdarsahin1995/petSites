import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../../services/userService/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {FileUpload} from '../../fileupload'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  temp:any;
  cins:any;
  Cinsiyet:any;
  Sehir:any;
  ilanAciklamasi:any;
  yas:any;
  url:any;
  name:any;
  @Input () fileUpload: FileUpload;

  constructor(public user: UserService,private db:AngularFireDatabase) { }

  ngOnInit() {
    this.temp = this.user.getEditId()
    console.log(this.temp)
    this.db.object('/Adverts/' + this.temp + "/Cinsi").snapshotChanges().subscribe(c=>{this.cins=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/Cinsiyet").snapshotChanges().subscribe(c=>{this.Cinsiyet=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/Sehir").snapshotChanges().subscribe(c=>{this.Sehir=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/ilanAciklamasi").snapshotChanges().subscribe(c=>{this.ilanAciklamasi=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/yas").snapshotChanges().subscribe(c=>{this.yas=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/url").snapshotChanges().subscribe(c=>{this.url=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/name").snapshotChanges().subscribe(c=>{this.name=c.payload.val()})

    console.log(this.cins)
  }

}

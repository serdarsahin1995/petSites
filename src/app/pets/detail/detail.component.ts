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
  ida:any;
  userTemp:any
  admin:boolean=false;
 
  @Input () fileUpload: FileUpload;

  constructor(public user: UserService,private db:AngularFireDatabase) { }

  ngOnInit() {
    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
    this.temp = this.user.getUid2;
    console.log(this.temp)
    this.db.list('/admin/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.userTemp.uid==key){
        this.admin=true;
        console.log(key)
        console.log(this.userTemp.uid)
       }     
     });
    });
    
    this.db.object('/Adverts/' + this.temp + "/Cinsi").snapshotChanges().subscribe(c=>{this.cins=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/Cinsiyet").snapshotChanges().subscribe(c=>{this.Cinsiyet=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/Sehir").snapshotChanges().subscribe(c=>{this.Sehir=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/ilanAciklamasi").snapshotChanges().subscribe(c=>{this.ilanAciklamasi=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/yas").snapshotChanges().subscribe(c=>{this.yas=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/url").snapshotChanges().subscribe(c=>{this.url=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/name").snapshotChanges().subscribe(c=>{this.name=c.payload.val()})
    this.db.object('/Adverts/' + this.temp + "/ida").snapshotChanges().subscribe(c=>{this.ida=c.payload.val()})
    
  }
  delete(){
    if(window.confirm('İlanı kaldırmak istediğinize emin misiniz?')){
      this.user.deleteAdvert(this.ida,this.temp)
    }
    
  }

}

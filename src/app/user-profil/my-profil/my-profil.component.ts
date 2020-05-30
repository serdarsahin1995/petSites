import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/userService/user.service'
import {AngularFireAuth} from '@angular/fire/auth';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

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
res:any;
resArray:Array<any>;
petsitter:boolean=false;
petOwn:boolean=false;
hakkinda:any
name:any
profilPhoto:any;
mesken:any
bahce:any
oda:any
sigara:any
baskapet:any
evPhoto:any
result:any ; result2:Array<any>;
petS:boolean=false;
temp:any
data:any;
hayvansahibi:any;
rol:any;
a:any
takvim:any
  constructor(private us : UserService,private afAuth: AngularFireAuth,private db : AngularFireDatabase) { 
 
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


    this.resArray=[]
    this.result2=[]
   
    
    this.db.list('/Petsitters/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(this.afAuth.auth.currentUser.uid==key){
         this.petsitter=true;
         this.us.takvimPetsitter().subscribe(t => this.takvim = t);
      
         this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/imageUrl").snapshotChanges().subscribe(c=>{this.profilPhoto=c.payload.val()})
         this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/hakkında").snapshotChanges().subscribe(c=>{this.hakkinda=c.payload.val()})
         this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/name").snapshotChanges().subscribe(c=>{this.name=c.payload.val()})
         this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/evBilgi/mesken").snapshotChanges().subscribe(c=>{this.mesken=c.payload.val()})
         this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/evBilgi/bahce").snapshotChanges().subscribe(c=>{this.bahce=c.payload.val()})
         this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/evBilgi/oda").snapshotChanges().subscribe(c=>{this.oda=c.payload.val()})
         this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/evBilgi/sigara").snapshotChanges().subscribe(c=>{this.sigara=c.payload.val()})
         this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/evBilgi/baskapet").snapshotChanges().subscribe(c=>{this.baskapet=c.payload.val()})
         this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/evBilgi/imageUrl").snapshotChanges().subscribe(c=>{this.evPhoto=c.payload.val()})
       }     
     });
    });
      this.db.list('/petOwn/').snapshotChanges().subscribe(items=>{
        items.forEach(values => {
         let key = values.key;
         if(this.afAuth.auth.currentUser.uid==key){
          this.petOwn=true;
        
          this.db.object('/petOwn/' + this.afAuth.auth.currentUser.uid + "/name").snapshotChanges().subscribe(c=>{this.name=c.payload.val()})
          this.db.object('/petOwn/' + this.afAuth.auth.currentUser.uid + "/image").snapshotChanges().subscribe(c=>{this.profilPhoto=c.payload.val()})
          
         }     
       });
      });
 
     

    
    
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
     this.getReservations()
    
  }
  getMesDetail(mId){
    
    this.afAuth.user.subscribe(user => this.us.getMdetail(user,mId).subscribe(m => {this.mdetail=m,this.mdetail2=m[0],this.mdetail3=m[1]}));
    this.afAuth.user.subscribe(user => this.us.messageTF(user,mId));
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
  onSubmit(key){
    this.us.messageSend(key,this.rol)
  }

  getReservations(){
    this.resArray = []
    this.result2=[]
     this.afAuth.user.subscribe(user=>this.us.getReservations(user.uid).subscribe(reserv=>{reserv.forEach(c=>{
       this.resArray.push(c)}),this.resArray.map(a=>this.db.object('/Petsitters/' + this.afAuth.auth.currentUser.uid + "/gecelik")
       .snapshotChanges().subscribe(c=>{this.result=c.payload.val(),this.result2.push(this.result*a.gece)}))}))
       
  }
  removeReservation(key){
    this.resArray =[]
    this.result2 = []
    this.db.object('Petsitters/'+this.afAuth.auth.currentUser.uid+"/reservations/"+key).remove();
  }
  applyReservation(obj,fiyat){
    this.us.applyResv(obj,fiyat)

  }

}

import { Injectable } from '@angular/core';
import {of as observableOf, Observable} from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import {map, switchMap } from 'rxjs/operators'
import {auth, User} from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import {CanActivate, Router} from '@angular/router';
declare let alertify:any;
@Injectable({
  providedIn: 'root',

})

export class UserService implements CanActivate {
temp:any;
editId:any;
name:any;
x:any;
getUid:any;
getUid2:any;
uid = this.afAuth.authState.pipe(
  map(authState => {
    if(!authState){
      return null;
    }else{
      return authState.uid;
    }
  })
    );
    isPetOwn:Observable<boolean>= this.uid.pipe(
      switchMap(uid=>{
        if(!uid){
          return observableOf(false);
        }else{
          return this.db.object<boolean>('/petOwn/'+ uid).valueChanges()
        }
      })
    );
isAdmin:Observable<boolean>= this.uid.pipe(
  switchMap(uid=>{
    if(!uid){
      return observableOf(false);
    }else{
      return this.db.object<boolean>('/admin/'+ uid).valueChanges()
    }
  })
);

editProfil(email,uid){
  this.temp=email;
  this.editId=uid
  console.log(this.temp);
}
  constructor(private afAuth:AngularFireAuth,private db :AngularFireDatabase, private router:Router) {
    
    }
  login(email, password){

this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result)=> this.router.navigate(['myProfil'])).catch((error) => {
  alertify.alert(error.message, function(){
  });
});

  }
  logout(){
this.afAuth.auth.signOut();
  }
  saveUser(user: firebase.User,namee) {
    if (!user) { return; }
    this.db.object('/users/' + user.uid).update({
      name: namee,
      email: user.email
    });
    this.db.object('/petOwn/' + user.uid).update({
      name: namee,
      email: user.email
    });
  }
  getCurrentUser(){
    return this.afAuth.authState;
  }
  canActivate():Observable<boolean>{
    return this.afAuth.authState.pipe(
      map(user=>{
        if(user){
          return true;
        }else{
          this.router.navigateByUrl('');
          return false;
        }
      })
    )
  }
  SignUp(email, password,name) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.saveUser(result.user,name);
        this.router.navigate(['myProfil']) //kayıt yapıldıgında nereye yönlendiricegini sec 
      }).catch((error) => {
        alertify.alert(error.message, function(){
        });
      })
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      alertify.alert('Password reset email sent, check your inbox.', function(){
      });
    }).catch((error) => {
      alertify.alert(error.message, function(){
      });
    })
  }
  getMessage(user: firebase.User){
    return  this.db.list('/ogrenci/' + user.uid + '/Mesaj').snapshotChanges().pipe(map(changes => changes
      .map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }

  getMdetail(user:firebase.User,mId){
    return  this.db.list('/ogrenci/' + user.uid + '/Mesaj/'+mId).snapshotChanges().pipe(map(changes => changes
      .map(c => c.payload.val())));
  }
  messageTF(user: firebase.User, key){
    this.db.object('/ogrenci/'+user.uid+'/Mesaj/'+ key).update({
        boolean: true,
  })
}
getAllpetSitters(){
  return  this.db.list('/Petsitters').snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }
  getAllAdverts(){
    return  this.db.list('/Adverts').snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
    }
  bePetsitter(metin,user:firebase.User){
    this.db.object('/users/' + user.uid + "/name").snapshotChanges().subscribe(c=>{this.name=c.payload.val()
    this.db.object('/requestBeSitter/' + user.uid + '/'  ).update({
      bilgi: metin,
      name: this.name,
})})
  }
  getAllrequest(){
    return  this.db.list('/requestBeSitter').snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
    }
    getbilgi(uid){
      return  this.db.list('/requestBeSitter/'+uid).snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
       
    }
    applyBePetsitter(uid,name){
      this.db.object('/Petsitters/' + uid + '/'  ).update({
        name: name,
        hakkında:"Boş",
        gecelik:"Boş",
        adress:"Boş"
  })
    }
    setKey(key){
      this.getUid = key;
      console.log(this.getUid)
    }
    Edit(key){
      this.getUid2 = key;
      console.log(this.getUid2)
    }
    getEditId(){
      return this.getUid2
    }
    getpetS(){
      return  this.getUid
    }
    getpetO(){
      return  this.getUid
    }
    getReservations(uid){
      return this.db.list('/Petsitters/' +uid+ '/reservations').snapshotChanges().pipe(map(changes => changes
        .map(c => ({key: c.payload.key, ...c.payload.val()}))));
    }
    addAdvert(Cinsi,Cinsiyet,yas,Sehir,ilanAciklamasi,key){
      var x =this.db.createPushId();
      this.db.object('/Adverts/'+x).update({
        Cinsi: Cinsi,
        Cinsiyet:Cinsiyet,
        yas:yas,
        Sehir: Sehir,
        ilanAciklamasi:ilanAciklamasi,
      })
      this.db.object('/petOwn/'+ key.uid+'/Adverts/'+x).update({
        Cinsi: Cinsi,
        Cinsiyet:Cinsiyet,
        yas:yas,
        Sehir: Sehir,
        ilanAciklamasi:ilanAciklamasi,
      })

    }
    detail(uid){
      this.db.object('/Adverts/'+uid)

    }
    getOwnPet(user: firebase.User){
      return  this.db.list('/petOwn/' + user.uid + '/Adverts').snapshotChanges().pipe(map(changes => changes
        .map(c => ({key: c.payload.key, ...c.payload.val()}))));
    }
    
}


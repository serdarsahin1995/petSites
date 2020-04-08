import { Injectable } from '@angular/core';
import {of as observableOf, Observable} from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import {map, switchMap } from 'rxjs/operators'
import {auth} from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import {CanActivate, Router} from '@angular/router';
declare let alertify:any;
@Injectable({
  providedIn: 'root',

})

export class UserService implements CanActivate {
temp:any;
editId:any;
uid = this.afAuth.authState.pipe(
  map(authState => {
    if(!authState){
      return null;
    }else{
      return authState.uid;
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

}


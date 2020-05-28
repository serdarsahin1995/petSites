import { Injectable } from '@angular/core';
import {of as observableOf, Observable} from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import {map, switchMap } from 'rxjs/operators'
import {auth, User} from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {CanActivate, Router} from '@angular/router';
declare let alertify:any;
import {FileUpload} from '../../fileupload';
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
keyTemp:any;
messageId:any;
kisi:any;
kisi2:any;
emailK:any;
emailG:any;
rolTemp:any;
editAdvertId:any;
gg:firebase.User
userT:any
userM:any
rolM:any
private basePath = '/uploads';
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
isPetsitter:Observable<boolean>= this.uid.pipe(
  switchMap(uid=>{
    if(!uid){
      return observableOf(false);
    }else{
      return this.db.object<boolean>('/Petsitters/'+ uid).valueChanges()
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
      email: user.email,
      image:"https://pbs.twimg.com/profile_images/606791666251493376/vn1M5fjn.jpg" 
    });
  }
  getCurrentUser(){
    return this.afAuth.authState;
  }

  getCU(){
    return this.afAuth.auth.currentUser.uid
  }
  canActivate():Observable<boolean>{
    return this.afAuth.authState.pipe(
      map(user=>{
        if(user){
          return true;
        }else{
          this.router.navigateByUrl('/register');
          alertify.success("Lütfen Önce kayıt olunuz!");
          return false;
        }
      })
    )
  }
  SignUp(email, password,name) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.saveUser(result.user,name);
        this.router.navigate(['myProfil'])
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
    
    console.log(this.rolM)
    if(this.rolM=="petOwn"){
      return  this.db.list('/petOwn/' + user.uid + '/Mesaj').snapshotChanges().pipe(map(changes => changes
        .map(c => ({key: c.payload.key, ...c.payload.val()}))));
    }
    if(this.rolM=="Petsitters"){
      return  this.db.list('/Petsitters/' + user.uid + '/Mesaj').snapshotChanges().pipe(map(changes => changes
        .map(c => ({key: c.payload.key, ...c.payload.val()}))));
    }else{
      return  this.db.list('/admin/' + user.uid + '/Mesaj').snapshotChanges().pipe(map(changes => changes
        .map(c => ({key: c.payload.key, ...c.payload.val()}))));
    }
     
  }
  mesajId(user,rol){
    this.userM=user;
    this.rolM=rol;
    

  }

  getMdetail(user:firebase.User,mId){
    if(this.rolM=="petOwn"){
      return  this.db.list('/petOwn/' + user.uid + '/Mesaj/'+mId).snapshotChanges().pipe(map(changes => changes
        .map(c => c.payload.val())));
    }
    if(this.rolM=="Petsitters"){
      return  this.db.list('/Petsitters/' + user.uid + '/Mesaj/'+mId).snapshotChanges().pipe(map(changes => changes
        .map(c => c.payload.val())));
    }else{
      return  this.db.list('/admin/' + user.uid + '/Mesaj/'+mId).snapshotChanges().pipe(map(changes => changes
        .map(c => c.payload.val())));
    }
  }
  
  messageTF(user: firebase.User, key){
    if(this.rolM=="petOwn"){
      this.db.object('/petOwn/'+user.uid+'/Mesaj/'+ key).update({
        boolean: true,
    })
  }
    else if(this.rolM=="Petsitters"){
      this.db.object('/Petsitters/'+user.uid+'/Mesaj/'+ key).update({
        boolean: true,
    })
  }
    else{
      this.db.object('/admin/'+user.uid+'/Mesaj/'+ key).update({
        boolean: true,
    })
  }
    
}
answer(key){
  this.emailG=key
  console.log(key.ıd)
}
rola(key){
this.rolTemp=key;
console.log(this.rolTemp)
}
sendMessage(key,baslık,mesaj,newdate,time,user: firebase.User){
  var x =this.db.createPushId();
  alertify.success("Mesaj Gönderildi");
  this.db.object('/petOwn/' + key+'/Mesaj/'+x).update({
    baslik:baslık,
    Mesaj: mesaj,
    Tarih:newdate,
    boolean:false,
    Time:time,
    gelen:this.emailK,
    id:user.uid
    
  }).then((result)=> this.router.navigate(['myProfil']));;;
}
sendMessage2(key,baslık,mesaj,newdate,time,user: firebase.User){
  var x =this.db.createPushId();
  if(this.kisi=="bakıcılar"){
    this.db.object('/Petsitters/' + key+'/Mesaj/'+x).update({
      baslik:baslık,
      Mesaj: mesaj,
      Tarih:newdate,
      boolean:false,
      Time:time,
      gelen:this.emailK,
      id:user.uid
    }).then((result)=> this.router.navigate(['myProfil']));;;
  }
  else if(this.kisi=="hayvan sahibleri"){
    this.db.object('/petOwn/' + key+'/Mesaj/'+x).update({
      baslik:baslık,
      Mesaj: mesaj,
      Tarih:newdate,
      boolean:false,
      Time:time,
      gelen:this.emailK,
      id:user.uid
    }).then((result)=> this.router.navigate(['myProfil']));;;
  }
  else{
    this.db.object('/admin/' + key+'/Mesaj/'+x).update({
      baslik:baslık,
      Mesaj: mesaj,
      Tarih:newdate,
      boolean:false,
      Time:time,
      gelen:this.emailK,
      id:user.uid
    }).then((result)=> this.router.navigate(['myProfil']));;;
  } 
}
answer2(key,baslık,mesaj,newdate,time,user: firebase.User){
  console.log(key)
  var x =this.db.createPushId();
  console.log(this.rolTemp)
  if(this.rolTemp=="hayvansahibi"){
    this.db.object('/petOwn/' + this.emailG+'/Mesaj/'+x).update({
      baslik:baslık,
      Mesaj: mesaj,
      Tarih:newdate,
      boolean:false,
      Time:time,
      gelen:this.emailK,
      id:user.uid
    }).then((result)=> this.router.navigate(['myProfil']));;;
  }
  else if(this.rolTemp=="bakıcı"){
    this.db.object('/Petsitters/' + this.emailG+'/Mesaj/'+x).update({
      baslik:baslık,
      Mesaj: mesaj,
      Tarih:newdate,
      boolean:false,
      Time:time,
      gelen:this.emailK,
      id:user.uid
    }).then((result)=> this.router.navigate(['myProfil']));;;
  }
  else{
    this.db.object('/admin/' + this.emailG+'/Mesaj/'+x).update({
      baslik:baslık,
      Mesaj: mesaj,
      Tarih:newdate,
      boolean:false,
      Time:time,
      gelen:this.emailK,
      id:user.uid
    }).then((result)=> this.router.navigate(['myProfil']));;;
  }
  
}

getAllpetSitters(){
  return  this.db.list('/Petsitters').snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }
  getAdmin(){
    return  this.db.list('/admin').snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
  }
getAllPetOwners(){
  return  this.db.list('/petOwn').snapshotChanges().pipe(
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
      email:user.email
})})
alertify.success("İstek Gönderildi");
  }
  getAllrequest(){
    return  this.db.list('/requestBeSitter').snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
    }
    getbilgi(uid){
      return  this.db.list('/requestBeSitter/'+uid).snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()}))));
       
    }
    removeAdvert(key,user:firebase.User){
      console.log(key)
      console.log(user.uid)
      this.db.object('/petOwn/'+user.uid +"/Adverts/"+key).remove();
      this.db.object('/Adverts/'+key).remove();
    }
    applyBePetsitter(uid,name,email,time,newdate){
      var x =this.db.createPushId();
      this.db.object('/Petsitters/' + uid + '/'  ).update({
        name: name,
        hakkında:"Boş",
        gecelik:"Boş",
        adress:"Boş",
        email:email,
        imageUrl:"https://media-cdn.t24.com.tr/media/library/2020/02/1582296383899-5660491.jpg-r_1920_1080-f_jpg-q_x-xxyxx"
  })
  this.db.object('/Petsitters/' + uid+'/Mesaj/'+x).update({
    baslik:"Kabul Edildiniz",
    Mesaj: "mesaj",
    Tarih:newdate,
    boolean:false,
    Time:time,
    gelen:"MyPetSitter",
    id:uid
  }).then((result)=> this.router.navigate(['myProfil']));;;
    }
    setKey(key){
      localStorage.setItem('key',key)
      this.getUid = key;
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
    mail(key){
      this.emailK=key;
      console.log(this.gg.uid)
      console.log(this.emailK)
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
    private saveFileData(fileUpload: FileUpload,keyTemp,Cinsi,Cinsiyet,yas,Sehir,ilanAciklamasi) {
      var x =this.db.createPushId();
      this.db.object('/Adverts/'+x).update({
        Cinsi: Cinsi,
        Cinsiyet:Cinsiyet,
        yas:yas,
        Sehir: Sehir,
        ilanAciklamasi:ilanAciklamasi,
        url:fileUpload.url,
        ida:keyTemp
      });
      this.db.object('/petOwn/'+ keyTemp+'/Adverts/'+x).update({
        Cinsi: Cinsi,
        Cinsiyet:Cinsiyet,
        yas:yas,
        Sehir: Sehir,
        ilanAciklamasi:ilanAciklamasi,
        url:fileUpload.url,
        ida:keyTemp
      });
      alertify.success("İlan oluşturuldu");
      this.router.navigateByUrl("/OwnAdvert")
    }
    detail(uid){
      this.db.object('/Adverts/'+uid)

    }
    getOwnPet(user: firebase.User){
      return  this.db.list('/petOwn/' + user.uid + '/Adverts').snapshotChanges().pipe(map(changes => changes
        .map(c => ({key: c.payload.key, ...c.payload.val()}))));
    }
    kisiselBilgi(isim,sehir,yas,hakkinda,gecelik,key){
      this.db.object('/Petsitters/'+key.uid).update({
        name: isim,
        adress:sehir,
        yas:yas,
        hakkında: hakkinda,
        gecelik:gecelik
      })
    }
    
    evBilgi(mesken,bahce,oda,baskapet,sigara,key){
      this.db.object('/Petsitters/'+key.uid+'/evBilgi').update({
        mesken: mesken,
        bahce:bahce,
        oda:oda,
        baskapet: baskapet,
        sigara:sigara,
      })
    }
    pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number },key,Cinsi,Cinsiyet,yas,Sehir,ilanAciklamasi) {
      this.keyTemp=key.uid
      console.log(this.keyTemp)

      var x =this.db.createPushId();
      
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`/uploads/${fileUpload.file.name}`).put(fileUpload.file);
      
  
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          // fail
          console.log(error);
        },
        () => {
          // success
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
             
            this.saveFileData(fileUpload,this.keyTemp,Cinsi,Cinsiyet,yas,Sehir,ilanAciklamasi);
          });
        }
      );
    }
    keepId(key,user){
      this.editAdvertId=key;
      this.userT=user.uid
    }
    deleteAdvert(uid,key){
      this.db.object('/Adverts/'+key).remove();
      this.db.object('/petOwn/'+uid+'/Adverts/'+key).remove();
    }
    pushFileToStorageEdit(fileUpload: FileUpload, progress: { percentage: number },key,Cinsi,Cinsiyet,yas,Sehir,ilanAciklamasi) {
      this.keyTemp=key.uid
      console.log(this.keyTemp)

      var x =this.db.createPushId();
      
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`/uploads/${fileUpload.file.name}`).put(fileUpload.file);
      
  
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          // fail
          console.log(error);
        },
        () => {
          // success
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('File available at', downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
             
            this.saveFileDataEdit(fileUpload,this.keyTemp,Cinsi,Cinsiyet,yas,Sehir,ilanAciklamasi);
          });
        }
      );
    }
    private saveFileDataEdit(fileUpload: FileUpload,keyTemp,Cinsi,Cinsiyet,yas,Sehir,ilanAciklamasi) {
      
      this.db.object('/Adverts/'+this.editAdvertId).update({
        Cinsi: Cinsi,
        Cinsiyet:Cinsiyet,
        yas:yas,
        Sehir: Sehir,
        ilanAciklamasi:ilanAciklamasi,
        url:fileUpload.url,
        ida:keyTemp
      });
      this.db.object('/petOwn/'+ keyTemp+'/Adverts/'+this.editAdvertId).update({
        Cinsi: Cinsi,
        Cinsiyet:Cinsiyet,
        yas:yas,
        Sehir: Sehir,
        ilanAciklamasi:ilanAciklamasi,
        url:fileUpload.url,
        ida:keyTemp
      });
      alertify.success("İlan Güncellendi");
      this.router.navigateByUrl("/OwnAdvert")
    }
    
    getFileUploads(numberItems): AngularFireList<FileUpload> {
      return this.db.list(this.basePath, ref =>
        ref.limitToLast(numberItems));
    }

    pushStorage(fileUpload: FileUpload, progress: { percentage: number },path){
      const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveImagetoDatabase(fileUpload,path);
        });
      }
    );
    }
    saveImagetoDatabase(fileUpload: FileUpload,path){
      if(path=="yok"){
        this.db.object(`Petsitters/`+firebase.auth().currentUser.uid+'/').update({imageUrl:fileUpload.url});
      }
      else{
      this.db.object(`Petsitters/`+firebase.auth().currentUser.uid+'/'+path).update({imageUrl:fileUpload.url});
    }
    }
    messageSend(key,kisit){
      this.messageId=key
      this.kisi=kisit
      console.log(this.kisi)
      console.log(this.messageId.name)
    }
    applyResv(obj){
      this.db.object(`Petsitters/`+firebase.auth().currentUser.uid+'/applyReservations/'+obj.key).update(obj);
      this.db.object('Petsitters/'+this.afAuth.auth.currentUser.uid+"/reservations/"+obj.key).remove();
    }
    remove(key,rol){
      
      if(rol=="hayvan sahibleri"){
  
        this.db.object('/petOwn/'+key).remove();
      }

    }
    reddet(uid){
      this.db.object('/requestBeSitter/'+uid).remove();
    }

    
}


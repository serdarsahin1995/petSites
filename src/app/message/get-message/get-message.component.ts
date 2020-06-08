import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/userService/user.service'
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
declare let alertify:any;

@Component({
  selector: 'app-get-message',
  templateUrl: './get-message.component.html',
  styleUrls: ['./get-message.component.css']
})
export class GetMessageComponent implements OnInit {
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
result:any ; result2:Array<any>;
rol:any
admin:boolean=false;
petOwn:boolean=false;
Petsitters:boolean=false;
say=0;
title = 'appBootstrap';
closeResult: string;

  constructor(private us : UserService,private afAuth: AngularFireAuth,private db : AngularFireDatabase,private router:Router,private modalService: NgbModal) { }

  ngOnInit() {
    this.us.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp);
   
   
    this.afAuth.user.subscribe(user => this.us.getMessage(user).subscribe(m => this.message=m));

    this.listFalse = []
    
    
    this.afAuth.user.subscribe(user => this.us.getMessage(user).subscribe(detail => {detail.forEach(c=>{
      this.listFalse.push(c)
    }
    );this.listFalse.map(item=> { if(item.boolean === false){ 
      this.count++
    if(this.count!=0 && this.say==0){
      alertify.success("Yeni Mesaj Var");
      this.say=this.say+1;
    }}this.bildirim=this.count});
      this.listFalse=[]
     this.count=0;}));


    this.resArray=[]
    this.result2=[]
  }
  
  answer(key2){
    
    console.log(key2)
    this.db.list('/petOwn/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(key2==key){
        this.petOwn=true;
        this.us.lookpetOwner("petOwn",key2)
        this.router.navigateByUrl('/answer');
        console.log(key)
        console.log(key2)
       }     
     });
    });
    
    if(this.us.lookpetOwn!=true){
      this.db.list('/admin/').snapshotChanges().subscribe(items=>{
        items.forEach(values => {
         let key = values.key;
         if(key2==key){
          this.admin=true;
          this.us.lookadmin("admin",key2)
          this.router.navigateByUrl('/answer');
          console.log(key)
          console.log(key2)
         }     
       });
      });
    }
    this.db.list('/Petsitters/').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
       let key = values.key;
       if(key2==key){
        this.Petsitters=true;
        this.us.lookpetOwner("Petsitters",key2)
         this.router.navigateByUrl('/answer');
        console.log(key)
        console.log(key2)
       }     
     });
    });
  }
  getMesDetail(mId){
   

    this.afAuth.user.subscribe(user => this.us.getMdetail(user,mId).subscribe(m => {this.mdetail=m,this.mdetail2=m[0],this.mdetail3=m[1]}));
    this.afAuth.user.subscribe(user => this.us.messageTF(user,mId));
  }
  unread(key){
    console.log(key)
    this.afAuth.user.subscribe(user => this.us.unread(user,key));
  }
  delete(key){
    console.log(key)
    this.afAuth.user.subscribe(user => this.us.deleteMessage(user,key));
  }
  open(content,mId) {

    this.afAuth.user.subscribe(user => this.us.getMdetail(user,mId).subscribe(m => {this.mdetail=m,this.mdetail2=m[0],this.mdetail3=m[1]}));
    this.afAuth.user.subscribe(user => this.us.messageTF(user,mId));
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
 
}


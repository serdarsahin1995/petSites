import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
countPetsitter:any
countUsers:any
countAdvert:any
  constructor(private afAuth: AngularFireAuth,private db : AngularFireDatabase,private us:UserService) { }

  ngOnInit() {
    
    this.db.list('/Petsitters').valueChanges().subscribe(c=>this.countPetsitter=c.length)
    this.db.list('/users').valueChanges().subscribe(c=>this.countUsers=c.length)
    this.db.list('/Adverts').valueChanges().subscribe(c=>this.countAdvert=c.length)
    
  }

}

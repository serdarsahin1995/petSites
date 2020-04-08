import { Component } from '@angular/core';
import { UserService } from './services/userService/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bootDene';
  userTemp:firebase.User
  constructor(public user: UserService) { }

  ngOnInit(){
    this.user.getCurrentUser().subscribe(userTemp=>this.userTemp=userTemp)
  }
}


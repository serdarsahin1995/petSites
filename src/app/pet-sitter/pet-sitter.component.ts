import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-pet-sitter',
  templateUrl: './pet-sitter.component.html',
  styleUrls: ['./pet-sitter.component.css']
})
export class PetSitterComponent implements OnInit {
  petsitters:any;

  constructor(private us:UserService) { }

  ngOnInit() {
    this.us.getAllpetSitters().subscribe(petsitters => this.petsitters = petsitters);
  }

}

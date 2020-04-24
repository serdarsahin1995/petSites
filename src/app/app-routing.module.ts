import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';
import { UserService } from './services/userService/user.service';
import {UserProfilComponent} from './user-profil/user-profil.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import {UserEditComponent } from './user-profil/user-edit/user-edit.component'
import {MyProfilComponent} from './user-profil/my-profil/my-profil.component'
import { RegisterUserComponent} from './authentication/register-user/register-user.component';
import { PetSitterComponent} from './pet-sitter/pet-sitter.component';
import {PetsComponent} from './pets/pets.component';
import { BePetsitterComponent } from './be-petsitter/be-petsitter.component';
import { ResponseRequestComponent } from './response-request/response-request.component';
import { PetsitterProfilComponent } from './user-profil/petsitter-profil/petsitter-profil.component';

const routes: Routes = [
	{ path:'giriş',component:LoginComponent},
	{path : "userProfil", component: UserProfilComponent},
	{path: "register", component: RegisterUserComponent},
	{path : "forgotPassword",component:ForgotPasswordComponent},
	{path : "editProfil",component:UserEditComponent},
	{path : "myProfil",component:MyProfilComponent},
	{path: "petSitter", component:PetSitterComponent},
	{path: "pets", component:PetsComponent},
	{path: "bakıcıol", component:BePetsitterComponent},
	{path: "bakıcıolmakisteyenler",component:ResponseRequestComponent},
	{path: "sitterProfil",component:PetsitterProfilComponent},

  {path:"app", component:AppComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

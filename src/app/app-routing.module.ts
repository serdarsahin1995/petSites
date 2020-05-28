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
import { AdvertComponent } from './pets/advert/advert.component';
import { DetailComponent } from './pets/detail/detail.component';
import { OwnPetComponent } from './pets/own-pet/own-pet.component';
import { EditProfilComponent } from './user-profil/edit-profil/edit-profil.component';
import { SendMessageComponent } from './message/send-message/send-message.component';
import { SendMessage2Component } from './message/send-message2/send-message2.component';
import { AnswerComponent } from './message/answer/answer.component';
import { AdminPageComponent } from './user-profil/admin-page/admin-page.component';
import {MainPageComponent} from './main-page/main-page.component'
import { EditAdvertComponent } from './pets/edit-advert/edit-advert.component';
import { GetMessageComponent } from './message/get-message/get-message.component';
import { MessageComponent } from './message/message/message.component';


const routes: Routes = [
	{ path: '',   redirectTo: '/mainpage', pathMatch: 'full' },
	{path:'mainpage', component:MainPageComponent},
	{ path:'giriş',component:LoginComponent},
	{path : "userProfil", component: UserProfilComponent},
	{path: "register", component: RegisterUserComponent},
	{path : "forgotPassword",component:ForgotPasswordComponent},
	{path : "editProfil",component:UserEditComponent},
	{path : "myProfil",component:MyProfilComponent,canActivate:[UserService]},
	{path: "petSitter", component:PetSitterComponent},
	{path: "pets", component:PetsComponent},
	{path: "bakıcıol", component:BePetsitterComponent,canActivate:[UserService]},
	{path: "bakıcıolmakisteyenler",component:ResponseRequestComponent,canActivate:[UserService]},
	{path: "sitterProfil",component:PetsitterProfilComponent},
	{path: "advert", component:AdvertComponent},
	{path: "detail",component:DetailComponent},
	{path: "OwnAdvert", component:OwnPetComponent,canActivate:[UserService]},
	{path:"editMyProfil",component:EditProfilComponent,canActivate:[UserService]},
	{path:"sendMesssage", component:SendMessageComponent,canActivate:[UserService]},
	{path:"sendMessage2", component:SendMessage2Component,canActivate:[UserService]},
	{path:"answer", component:AnswerComponent,canActivate:[UserService]},
	{path:"usersPage", component:AdminPageComponent,canActivate:[UserService]},
	{path:"editAdvert", component:EditAdvertComponent,canActivate:[UserService]},
	{path:"getMessage", component:GetMessageComponent,canActivate:[UserService]},
	{path: "message", component:MessageComponent,canActivate:[UserService]},
	  {path:"app", component:AppComponent},
	  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

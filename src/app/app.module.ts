import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserEditComponent } from './user-profil/user-edit/user-edit.component';
import { MyProfilComponent } from './user-profil/my-profil/my-profil.component';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { PetSitterComponent } from './pet-sitter/pet-sitter.component';
import { PetsComponent } from './pets/pets.component';
import { BePetsitterComponent } from './be-petsitter/be-petsitter.component';
import { ResponseRequestComponent } from './response-request/response-request.component';
import {PetsitterProfilComponent} from './user-profil/petsitter-profil/petsitter-profil.component';
import { AdvertComponent } from './pets/advert/advert.component';
import { DetailComponent } from './pets/detail/detail.component';
import { OwnPetComponent } from './pets/own-pet/own-pet.component';
import { EditProfilComponent } from './user-profil/edit-profil/edit-profil.component';
import { SendMessageComponent } from './message/send-message/send-message.component';
import { GetMessageComponent } from './message/get-message/get-message.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfilComponent,
    ForgotPasswordComponent,
    UserEditComponent,
    MyProfilComponent,
    RegisterUserComponent,
    PetSitterComponent,
    PetsComponent,
    BePetsitterComponent,
    ResponseRequestComponent,
    PetsitterProfilComponent,
    AdvertComponent,
    DetailComponent,
    OwnPetComponent,
    EditProfilComponent,
    SendMessageComponent,
    GetMessageComponent,
   
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    ReactiveFormsModule,
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyDZIlvXxdUkCpstBTGctZvikmkRjw4Rjt0",
        authDomain: "petsitter-f55fd.firebaseapp.com",
        databaseURL: "https://petsitter-f55fd.firebaseio.com",
        projectId: "petsitter-f55fd",
        storageBucket: "petsitter-f55fd.appspot.com",
        messagingSenderId: "809158035540",
        appId: "1:809158035540:web:09536b290b276bce9845c1",
        measurementId: "G-5J0Q9XWS9X"
      }
    ),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

  ],
  providers: [UserProfilComponent,UserEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


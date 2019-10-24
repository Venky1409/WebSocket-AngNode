import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user.component';
import { ProfileComponent } from './profile/profile.component';
import { SafePipe } from './pipe';

import { MessageService } from './services/message.service';
import { AppService } from './services/app.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', children: [
      { path: '', children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'messages', component: MessageComponent },
      { path: 'users', component: UserComponent },
      { path: 'profile', component: ProfileComponent }
      ]}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessageComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    ProfileComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MessageService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {Component, Type, OnInit, OnDestroy} from '@angular/core';
import {AppService} from '../services/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login-bar',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameL;
  emailL;
  usernameR;
  emailR;

  constructor(private appService: AppService, private router: Router) { }

   ngOnInit() {
    }

   login() {
   	if (this.usernameL && this.emailL) {
   		this.appService.login(this.usernameL, this.emailL)
	     .subscribe(
	       res => {
	         if (!res.error) {
            sessionStorage.setItem('name', res.data.name);
            sessionStorage.setItem('id', res.data.id);
	         	this.router.navigate(['/home']);
	         } else {
            alert(res.error);
           }
	       }, error => {
	       	console.log("Error", error);
	       });
   	} else {
   		alert("Please fill the login fields");
   	}
   }

   register() {
   	if (this.usernameR && this.emailR) {
   		this.appService.register(this.usernameR, this.emailR)
	     .subscribe(
	       res => {
	         if (!res.error) {
	         	this.router.navigate(['/home']);
	         }
	       }, error => {
	       	console.log("Error", error);
	       });
   	} else {
   		alert("Please fill the registration fields");
   	}
   }
}

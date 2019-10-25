import {Component, Type, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	user;
  constructor(private router: Router) { }

   ngOnInit() {
	  if (!sessionStorage.length) {
       this.router.navigate(['/']);
      } else {
      	this.user = sessionStorage.getItem('name');
      }
    }
}

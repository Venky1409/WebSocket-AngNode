import {Component, Type, OnInit, OnDestroy} from '@angular/core';
import { MessageService } from '../services/message.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {};
  id;
  constructor(private messageService: MessageService, private router: Router) { }

   ngOnInit() {
      if (!sessionStorage.length) {
       this.router.navigate(['/']);
      } else {
        this.id = sessionStorage.getItem('id');
      }
      this.messageService.getProfile().subscribe(profile => {
        this.profile = profile;
      });
      this.messageService.sendProfile(this.id);
    }
}

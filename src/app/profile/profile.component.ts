import {Component, Type, OnInit, OnDestroy} from '@angular/core';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(private messageService: MessageService) { }

   ngOnInit() {
     this.messageService.getUsers().subscribe(profile => {
      this.profile = profile;
    })
    }
}

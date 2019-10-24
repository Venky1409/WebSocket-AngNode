import {Component, Type, OnInit, OnDestroy} from '@angular/core';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users = [];

  constructor(private messageService: MessageService) { }

   ngOnInit() {
     this.messageService.getUsers().subscribe(users => {
      this.users = users;
    })
    }

    updateUser(user) {
      console.log(user);
      this.messageService.updateUser(user);
    }
}

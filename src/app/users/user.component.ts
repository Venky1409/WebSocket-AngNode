import {Component, Type, OnInit, OnDestroy} from '@angular/core';
import { MessageService } from '../services/message.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users = [];

  constructor(private messageService: MessageService, private router: Router) { }

   ngOnInit() {
    if (!sessionStorage.length) {
       this.router.navigate(['/']);
      }
     this.messageService.getUsers().subscribe(users => {
      this.users = users;
    })
    }

    updateUser(user) {
      this.messageService.updateUser(user);
    }
}

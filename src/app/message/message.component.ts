import {Component, Type, OnInit, OnDestroy} from '@angular/core';
import { MessageService } from '../services/message.service';
import {Router} from '@angular/router';
@Component({
  selector: 'message-bar',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages = [];
  message = "";
  name;

  constructor(private messageService: MessageService, private router: Router) { }

   ngOnInit() {
      if (!sessionStorage.length) {
       this.router.navigate(['/']);
      }
     this.messageService.getMessages().subscribe(message => {
      this.messages = message;
    })
    }

    sendMessage() {
      this.name = sessionStorage.getItem('name');
      this.messageService.sendMessage(this.message, this.name);
      this.message = '';
    }
}

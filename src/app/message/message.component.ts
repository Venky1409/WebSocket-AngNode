import {Component, Type, OnInit, OnDestroy} from '@angular/core';
import { MessageService } from '../services/message.service';
@Component({
  selector: 'message-bar',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages = [];
  message = "";

  constructor(private messageService: MessageService) { }

   ngOnInit() {
     this.messageService.getMessages().subscribe(message => {
      this.messages = message;
    })
    }

    sendMessage() {
      this.messageService.sendMessage(this.message);
      this.message = '';
    }
}

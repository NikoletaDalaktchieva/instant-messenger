import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-chat-pop-up',
  templateUrl: './chat-pop-up.component.html',
  styleUrls: ['./chat-pop-up.component.css']
})
export class ChatPopUpComponent implements OnInit {

  roomName = '';

  constructor(private chatService: ChatService,
    private errorService: ErrorService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addChat(name: string): void {
    name.trim();

    if (name === '') {
      this.errorService.showError('Please, fill in name!');
      return;
    }

    this.chatService.createChatRoom(name)
      .subscribe(result => {
        Swal.fire("Added successfully", '', 'info');
        this.router.navigateByUrl('/');
      },
        error => {
          if(error.error.result !== undefined) {
            this.errorService.showError(error.error.message);
          } else {
            this.errorService.showError();
          }
        },
        () => { }
      );
  }

  closeForm(): void {
    this.router.navigateByUrl('/');
  }
}

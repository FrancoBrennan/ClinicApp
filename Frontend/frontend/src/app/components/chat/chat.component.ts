import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { SocketService } from '../../services/chat/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('messages', { static: true })
  messages!: ElementRef;
  message: string = '';

  constructor(private socketService: SocketService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.socketService.getMessages().subscribe(({ text, username }) => {
      this.addMessageToChat(text, username);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.message);
      this.message = '';
    }
  }

  addMessageToChat(msg: string, username: string): void {
    const isOwnMessage = username === this.socketService.getUsername();
    const messageClass = isOwnMessage ? 'my-message' : 'other-message';

    const comentariosDiv = this.renderer.createElement('div');
    this.renderer.addClass(comentariosDiv, 'comentarios');

    const comentarioDiv = this.renderer.createElement('div');
    this.renderer.addClass(comentarioDiv, 'comentario');
    this.renderer.addClass(comentarioDiv, 'burbuja');
    this.renderer.addClass(comentarioDiv, messageClass);

    const listItem = this.renderer.createElement('li');

    const p = this.renderer.createElement('p');
    const pText = this.renderer.createText(msg);
    this.renderer.appendChild(p, pText);

    const small = this.renderer.createElement('small');
    const smallText = this.renderer.createText(username);
    this.renderer.appendChild(small, smallText);

    this.renderer.appendChild(listItem, p);
    this.renderer.appendChild(listItem, small);

    this.renderer.appendChild(comentarioDiv, listItem);
    this.renderer.appendChild(comentariosDiv, comentarioDiv);

    this.renderer.appendChild(this.messages.nativeElement, comentariosDiv);
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const element = this.messages.nativeElement;
    element.scrollTop = element.scrollHeight;
  }
}

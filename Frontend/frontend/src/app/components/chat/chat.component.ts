import { Component, OnInit, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { SocketService } from '../../services/chat/socket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared-service.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messages', { static: true }) messages!: ElementRef;
  @ViewChild('comentarios', { static: true }) comentarios!: ElementRef;

  message: string = '';
  private unsubscribe$ = new Subject<void>();

  doctorUsername: string | null = null;
  patientUsername: string | null = null;
  roomName=""
  private isInChat = false; // Flag to track if user is currently in the chat
  private isNearBottom = true; // Flag to check if user is near the bottom

  constructor(
    private socketService: SocketService,
    private renderer: Renderer2,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    // Suscribirse a los cambios en los nombres de usuario
    /*this.sharedService.usernames$.pipe(takeUntil(this.unsubscribe$)).subscribe(usernames => {
      const doctorUsername = usernames.doctor;
      const patientUsername = usernames.patient;

      if (doctorUsername && patientUsername) {
        this.roomName = `chat-${doctorUsername}-${patientUsername}`;
        console.log(this.roomName);
        this.socketService.joinRoom(this.roomName);
        this.isInChat = true;
        this.scrollToBottom();
      }
    });
*/

    this.doctorUsername=sessionStorage.getItem("doctor")
    this.patientUsername=sessionStorage.getItem("patient")

    if (this.doctorUsername && this.patientUsername) {
      this.roomName = `chat-${this.doctorUsername}-${this.patientUsername}`;
      console.log(this.roomName);
      this.socketService.joinRoom(this.roomName);
      this.isInChat = true;
      this.scrollToBottom();
    }

    // Escuchar el evento de recepción de mensajes
    this.socketService.messages$.subscribe(messages => {
      messages.forEach(message => {
        if (message.room === this.roomName) {
          this.addMessageToChat(message.content, message.user);
        }
      });
    });

    /*
    this.messages.nativeElement.addEventListener('scroll', () => {
      const threshold = 150;
      const position = this.messages.nativeElement.scrollTop + this.messages.nativeElement.offsetHeight;
      const height = this.messages.nativeElement.scrollHeight;
      this.isNearBottom = position > height - threshold;
    });
    */
  }

  /*
  checkAndJoinRoom(): void {
    if (this.doctorUsername && this.patientUsername) {
      this.roomName = `chat-${this.doctorUsername.toString()}-${this.patientUsername.toString()}`;
      console.log(this.roomName)
      this.socketService.joinRoom(this.roomName);
      this.isInChat = true;
      
    }
  }
  */

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.socketService.sendMessage(this.roomName, this.message, this.authService.getUsernameFromToken()?.toString() as string);
      this.message = '';
    }
  }

  addMessageToChat(msg: string, username: string): void {
    console.log('Adding message to chat:', msg, 'from:', username);
    const isOwnMessage = username === this.authService.getUsernameFromToken();
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
    
    
    this.scrollToBottom()
    
    
  }

  private scrollToBottom(): void {
    try {
      this.messages.nativeElement.scrollTop = this.messages.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom', err);
    }
  }
}

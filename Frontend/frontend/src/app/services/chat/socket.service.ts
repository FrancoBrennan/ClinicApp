import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  private serverOffsetSubject = new BehaviorSubject<number>(0);

  constructor(private authService: AuthService) {
    this.initSocket();
  }

  private initSocket(): void {
    const username = this.authService.getUsernameFromToken() || 'anonymous';
    this.socket = io('http://localhost:3000', { // Asegúrate de usar la URL correcta de tu servidor
      auth: {
        username: username,
        serverOffset: this.serverOffsetSubject.value
      }
    });

    this.socket.on('chat message', (msg: string, serverOffset: string, username: string) => {
      this.serverOffsetSubject.next(parseInt(serverOffset, 10));
    });
  }

  sendMessage(msg: string): void {
    this.socket.emit('chat message', msg);
  }

  getMessages(): Observable<{ text: string, username: string }> {
    return new Observable(observer => {
      this.socket.on('chat message', (msg: string, serverOffset: string, username: string) => {
        observer.next({ text: msg, username });
      });
    });
  }

  getServerOffset(): Observable<number> {
    return this.serverOffsetSubject.asObservable();
  }

  getUsername(): string {
    return this.authService.getUsernameFromToken() || 'anonymous';
  }
}

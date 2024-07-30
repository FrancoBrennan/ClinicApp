import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private socket: Socket;
  private messageSubject = new BehaviorSubject<{ room: string, content: string, user: string }[]>([]);
  private serverOffsetSubject = new BehaviorSubject<number>(0);
  public messages$ = this.messageSubject.asObservable();

  constructor() {
    this.socket = io('http://localhost:3000', {
      auth: {
        username: localStorage.getItem('username'),
        serverOffset: this.serverOffsetSubject.value
      }
    });

    this.socket.on('joinedRoom', (data: { messages: { roomName: string, username: string, message: string, id: string }[] }) => {
      const currentMessages = this.messageSubject.getValue();
      this.messageSubject.next([...currentMessages, ...data.messages.map(msg => ({
        room: msg.roomName,
        content: msg.message,
        id: msg.id, // Incluimos el id
        user: msg.username,
      }))]);
    });

    this.socket.on('receiveMessage', (data: { text: string, username: string, serverOffset: number, roomName: string}) => {
      this.serverOffsetSubject.next(parseInt(data.serverOffset.toString(), 10));
      const currentMessages = this.messageSubject.getValue();
      this.messageSubject.next([...currentMessages, {
        room: data.roomName,
        content: data.text,
        user: data.username
      }]);
    });
  }

  joinRoom(roomName: string): void {
    console.log(roomName);
    this.socket.emit('joinRoom', roomName);
  }

  leaveRoom(roomName: string): void {
    this.socket.emit('leaveRoom', { roomName });
  }

  sendMessage(roomName: string, message: string, username: string): void {
    this.socket.emit('chatMessage', { message, roomName, username});
  }

  getServerOffset(): Observable<number> {
    return this.serverOffsetSubject.asObservable();
  }
}

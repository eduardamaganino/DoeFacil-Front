import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";
import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { UsuarioService } from 'app/modules/usuario/shared/usuario.service';
import { Usuario } from 'app/modules/usuario/shared/usuario.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit  {
  @ViewChild('chatBox') private chatContainer: ElementRef;
  username: string;
  message = '';
  messages: Array<any> = [];
  sending: boolean;
  user: Usuario;

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private usuarioService: UsuarioService) {
  }

  getUser(): void {
    this.username = this.localStorageService.getItem('user').user_id;
    this.usuarioService.get(this.username).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.getUser();
    Pusher.logToConsole = true;

    var pusher = new Pusher('5289bdfdfce118183042', {
      cluster: 'sa1'
    });

    var channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      this.messages.push(data);
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      });
    });
  }

  submit(): void {
    if(this.message === '') {
      return;
    }
    this.sending = true;
    this.http.post('http://127.0.0.1:8000/api/message', {
      username: this.username,
      message: this.message
    }).subscribe(() => {
      this.message = ''
      this.sending = false;
    },
    err => {
      this.sending = false;
    });
  }

}

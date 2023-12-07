import {Component, OnInit} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";
import { LocalStorageService } from 'app/shared/services/local-storage.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit  {
  username: string;
  message = '';
  messages: Array<any> = [];

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  getUser(): void {
    this.username = this.localStorageService.getItem('user').user_id;
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
    });
  }

  submit(): void {
    this.http.post('http://127.0.0.1:8000/api/message', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }
}

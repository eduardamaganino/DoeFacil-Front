import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";
import { LocalStorageService } from 'app/shared/services/local-storage.service';
import { UsuarioService } from 'app/modules/usuario/shared/usuario.service';
import { Usuario } from 'app/modules/usuario/shared/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { get } from 'lodash';
import { DoacaoService } from 'app/modules/doacao/shared/doacao.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Doacao } from 'app/modules/doacao/shared/doacao.model';


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
  doacao: Doacao;

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private usuarioService: UsuarioService,
              private route: ActivatedRoute,
              private doacaoService: DoacaoService,
              public dialogRef: MatDialogRef <ChatComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { donationId: number, action: string }) { }

  getUser(): void {
    this.username = this.localStorageService.getItem('user').user_id;
    this.usuarioService.get(this.username).subscribe(user => {
      this.user = user;
    });
  }
  
  getMessages(): void {
    this.http.get('http://127.0.0.1:8000/api/message/' + this.data.donationId).subscribe((messages: Array<any>) => {
        this.messages = messages;
        console.log(this.messages);
        setTimeout(() => {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        });
      });
    }

  ngOnInit(): void {
    this.getUser();
    this.getDoacao();
    this.getMessages();
    console.log(this.data);
    Pusher.logToConsole = false;

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
      message: this.message,
      type: this.data.action,
      donationId: this.data.donationId
    }).subscribe(() => {
      this.message = ''
      this.sending = false;
    },
    err => {
      this.sending = false;
    });
  }

  getDoacao(): void {
    this.doacaoService.get(this.data.donationId).subscribe(doacao => {
      this.doacao = doacao;
      console.log(this.doacao)
    });
  }

  decline(): void {
    this.http.delete('http://127.0.0.1:8000/api/message/' + this.data.donationId).subscribe(() => {
        this.message = ''
        this.sending = false;
        this.dialogRef.close(0);
      }
    );
  }

  accept(): void {
    const data = {
      id: this.doacao.id,
      item: this.doacao.item,
      doador: this.doacao.doador,
      donatario: this.doacao.donatario,
      dataDoacao: this.doacao.dataDoacao,
      recebido: true,
      pedidos: this.doacao.pedidos
    }
    
    this.doacaoService.update(data).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(1);
    });

  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const chatRoutes: Route[] = [
    {
      path     : '',
      component: ChatComponent,
    },
  ];



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    RouterModule.forChild(chatRoutes),
    FormsModule,
    CommonModule
  ]
})
export class ChatModule { }

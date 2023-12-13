import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

const chatRoutes: Route[] = [
    {
      path     : ':id/:action',
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
    MatButtonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ]
})
export class ChatModule { }

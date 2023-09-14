import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { DetailsItemComponent } from './details-item/details-item.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';



const itensRoutes: Route[] = [

  {
    path     : 'create',
    component: DetailsItemComponent,
  },
  {
    path     : 'list',
    component: ListItemComponent,
  },
];



@NgModule({
  declarations: [
    ListItemComponent,
    DetailsItemComponent
  ],
  imports: [
    RouterModule.forChild(itensRoutes),
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatDividerModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule
  ]
})
export class ItemModule { }

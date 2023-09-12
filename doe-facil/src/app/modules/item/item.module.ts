import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { DetailsItemComponent } from './details-item/details-item.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const itensRoutes: Route[] = [

  {
    path     : 'create',
    component: DetailsItemComponent,
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
    MatInputModule
  ]
})
export class ItemModule { }

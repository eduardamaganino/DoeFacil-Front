import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { DetailsItemComponent } from './details-item/details-item.component';



@NgModule({
  declarations: [
    ListItemComponent,
    DetailsItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ItemModule { }

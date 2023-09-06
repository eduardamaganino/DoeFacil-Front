import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDoacaoComponent } from './list-doacao/list-doacao.component';
import { DetailsDoacaoComponent } from './details-doacao/details-doacao.component';



@NgModule({
  declarations: [
    ListDoacaoComponent,
    DetailsDoacaoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DoacaoModule { }

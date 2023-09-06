import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsUsuarioComponent } from './details-usuario/details-usuario.component';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';



@NgModule({
  declarations: [
    DetailsUsuarioComponent,
    ListUsuarioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { }

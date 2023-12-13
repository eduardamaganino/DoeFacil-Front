import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'app/modules/item/shared/item.model';
import { ItemService } from 'app/modules/item/shared/item.service';
import { DoacaoService } from 'app/modules/doacao/shared/doacao.service';
import { Doacao } from 'app/modules/doacao/shared/doacao.model';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from 'app/modules/chat/chat/chat.component';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss']
})
export class ListUsuarioComponent implements OnInit{

  checked = false;
  disabled = false;
  menuSelecionado: string;

  usuario: Usuario = {};
  
  itensCollection: Item[] = [];
  doacoesRecebidosCollection: Item[] = [];

  doacaoesCollection: Doacao[] = [];


  debug = true;
  message = '';
  currentUsuarioID: any;

  constructor(private usuarioService: UsuarioService,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private doacaoService: DoacaoService,
              private dialog: MatDialog,) {
              }

  ngOnInit(): void {
    this.getDoacoes();
    this.message = '';
    this.currentUsuarioID = this.route.snapshot.params['id']  
    console.log(this.currentUsuarioID);  
    this.getUsuario(this.currentUsuarioID);
    this.menuSelecionado =  'sobreMim';
  }

  getDoacoes(): void {
    this.doacaoService.getAll()
    .subscribe(data => {
      this.doacaoesCollection = data;
    }); 
  }
            
  getUsuario(id: string): void {
    this.usuarioService.get(id)
      .subscribe(
        data => {
          this.usuario = data;
          if (this.debug) console.log(data);
          this.getItensByUser(data.id);
          this.getItensRecebidos(data.id);

        },
        error => {
          console.log(error);
        });
  }

  getItensByUser(idUser: string): void {  
    this.itemService.getAll()
      .subscribe(data => {
          console.log(data)
          const itensFiltrados: Item[] = [];
  
          for (const item of data) {
            console.log(item.dono)
            if (item.dono === idUser) {
              itensFiltrados.push(item);
            }
          }
  
          this.itensCollection = itensFiltrados;
          console.log(this.itensCollection)

    }); 
  }

  getItensRecebidos(idUser: string): void {
    this.doacaoService.getAll()
    .subscribe(data => {
      const doacaoFiltrados: Doacao[] = [];
      for (const doacao of data) {
        if (doacao.donatario === idUser) {
          doacaoFiltrados.push(doacao);
        }
      }
      this.doacoesRecebidosCollection = [];
      for (const doacao of doacaoFiltrados) {
        this.itemService.get(doacao.item)
        .subscribe(item => {
          this.doacoesRecebidosCollection.push(item);
        });
      }
      this.doacoesRecebidosCollection = this.doacoesRecebidosCollection.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
    }); 
  }

  getAvaliacao(): void {
    
  }

  openChat(item: any): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '500px',
      height: '500px',
      data: {
        donationId: item.id,
        action: 'donor'
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 1) {
        item.recebido = true;
        this.itemService.update(item).subscribe((res) => {
          console.log(res);
          this.getItensRecebidos(this.currentUsuarioID);
        });
      }
    });
  }

  getDoacaoStatus(item: Item): boolean {
    if(this.doacaoesCollection.length > 0) {
      for (const doacao of this.doacaoesCollection) {
        if (doacao.item === item.id) {
          return doacao.recebido;
        }
      }
    }
  }

}

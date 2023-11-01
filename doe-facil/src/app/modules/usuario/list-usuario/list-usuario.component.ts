import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'app/modules/item/shared/item.model';
import { ItemService } from 'app/modules/item/shared/item.service';
import { DoacaoService } from 'app/modules/doacao/shared/doacao.service';
import { Doacao } from 'app/modules/doacao/shared/doacao.model';

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
  doacoesRecebidosCollection: Doacao[] = [];


  debug = true;
  message = '';
  currentUsuarioID: any;

  constructor(private usuarioService: UsuarioService,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private doacaoService: DoacaoService) {
              }

  ngOnInit(): void {
    this.message = '';
    this.currentUsuarioID = this.route.snapshot.params['id']    
    this.getUsuario(this.currentUsuarioID);
    this.menuSelecionado =  'sobreMim';
  }
            
  getUsuario(id: string): void {
    this.usuarioService.get(id)
      .subscribe(
        data => {
          this.usuario = data;
          if (this.debug) console.log(data);
          this.getItensByUser(data.nome);

        },
        error => {
          console.log(error);
        });
  }

  getItensByUser(nomeUsuario: string): void {  
    this.itemService.getAll()
      .subscribe(data => {
          console.log(data)
          const itensFiltrados: Item[] = [];
  
          for (const item of data) {
            console.log(item.usuario)
            if (item.usuario === nomeUsuario) {
              itensFiltrados.push(item);
            }
          }
  
          this.itensCollection = itensFiltrados;
          console.log(this.itensCollection)

    }); 
  }

  getItensRecebidos(nomeUsuario: string): void {
    this.doacaoService.getAll()
    .subscribe(data => {
      console.log(data)
      const doacaoFiltrados: Doacao[] = [];
      for (const doacao of data) {
        console.log(doacao.donatario)
        if (doacao.donatario === nomeUsuario) {
          doacaoFiltrados.push(doacao);
        }
      }
      this.doacoesRecebidosCollection = doacaoFiltrados;
      console.log(this.doacoesRecebidosCollection);
      //getItemByDoacao(doacaoFiltrados);
    }); 
  }

  getAvaliacao(): void {
    
  }

}

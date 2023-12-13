import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../shared/item.model';
import { ItemService } from '../shared/item.service';
import { LocalStorageService } from 'app/shared/services/local-storage.service';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.scss']
})
export class DetailsItemComponent implements OnInit {

  //ve essas categorias
  categories = ['moda', 'calcados', 'joias', 'jardinagem', 'decoracao', 'brinquedos', 'livros', 'eletrodomesticos', 'moveis', 'outros'];
  radioValue: number = -1;
  editMode: boolean = false;

  checked = false;
  disabled = false;

  item: Item = {
    titulo: '',
    motivo: '',
    quantidade: 0,
    dono: '',
    fotos: '',
    tempoDeUso: '',
    condicao: '',
    categoria: '',
  };

  submitted = false;
  debug = true;
  currentItemID: any;
  currentIdUser: any;

  constructor(private itemService: ItemService, private route: ActivatedRoute,
              private router: Router,
              private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.idItem) {
        this.editMode = true;
        this.currentItemID = params.idItem;
        this.getItem(this.currentItemID);
      } else if (params.idUser) {
        this.currentIdUser = params.idUser;
      } else {
        this.editMode = false;
      }
    });
  }

  createItem(): void {
    const userId = this.localStorage.getItem('user').user_id;
    console.log(userId);

    const data = {
      titulo: this.item.titulo,
      motivo: this.item.motivo,
      quantidade: this.item.quantidade,
      dono: userId,
      fotos: this.item.fotos,
      tempoDeUso: this.item.tempoDeUso,
      condicao: this.item.condicao,
      categoria: this.item.categoria,
      recebido: 0,
    };
  
    console.log(data);

    this.itemService.create(data).subscribe(
      response => {
        if (this.debug) console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  getItem(id: string): void {
    this.itemService.get(id)
      .subscribe(
        data => {
          this.item = data;
          if (this.debug) console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateItem(): void {            
    this.itemService.update(this.item)
      .subscribe(
        response => {
          if (this.debug) console.log(response);         
        },
          error => {
            console.log(error);
          });
  }
            
  deleteItem(): void {
    this.itemService.delete(this.item.itemId)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.router.navigate(['/item/list/moda']);
        
        },
        error => {
          console.log(error);
        });
  }

  submitItem(){
    if(this.editMode){
      this.updateItem();
    }else{
      this.createItem();
    }
  }
}

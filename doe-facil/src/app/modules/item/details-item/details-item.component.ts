import { Component } from '@angular/core';
import { Item } from '../shared/item.model';
import { ItemService } from '../shared/item.service';


@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.scss']
})
export class DetailsItemComponent {
  
  categories = ['moda', 'calcados','joias', 'jardinagem', 'decoracao', 'brinquedos', 'livros', 'eletrodomesticos', 'moveis', 'outros'];
  radioValue: number = -1;


  checked = false;
  disabled = false;

  item: Item = {
    titulo: '',
    motivo: '',
    quantidade: 0,
    usuario: '',
    fotos: '',
    tempoDeUso: '',
    condicao: '',
    categoria: '',
  }

  submitted = false;
  debug = true;

  constructor(private itemService: ItemService,
              ) {}

  ngOnInit(): void {

 
  }

  createItem(): void {
    const data = {
      titulo: this.item.titulo,
      motivo: this.item.motivo,
      quantidade: this.item.quantidade,
      usuario: this.item.usuario,
      fotos: this.item.fotos,
      tempoDeUso: this.item.tempoDeUso,
      condicao: this.item.condicao,
      categoria: this.item.categoria,
    };

    this.itemService.create(data)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.submitted = true;
         
        },
        error => {
          console.log(error);
         
        });
  }

  newItem(): void {
    this.submitted = false;
    this.debug = true;

    this.item = {
      titulo: '',
      motivo: '',
      quantidade: 0,
      usuario: '',
      fotos: '',
      tempoDeUso: '',
      condicao: '',
      categoria: '',
    }
  
  }


}

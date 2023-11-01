import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Item } from 'app/modules/item/shared/item.model';
import { ItemService } from 'app/modules/item/shared/item.service';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    styleUrls    : ['./example.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit{

    itensCollection?: Item[];
    currentItem: Item = {};
    currentIndex = -1;
    debug = true;
    
    constructor(protected itemService: ItemService)
    {}

    ngOnInit(): void {
        this.getItens();
    }

      //verificar se ta disponivel ainda ou nao
    getItens(){
        this.itemService.getAll()
            .subscribe(
                data => {
                    this.itensCollection = data;
                    if (this.debug) console.log(data);
                },
                error => {
                    console.log(error);
                }
            );

    }


    refreshList(): void {
        this.getItens();
        this.currentIndex = -1;
    }


    onSearchResults() {
        
    }

    pedidoDeDoação(){
        // verifica se ja existe alguma doação deste item
        // se nao
        // cria uma doação e adiciona no pedidos
        // se sim
        // adiciona nos pedidos
    }

    
}

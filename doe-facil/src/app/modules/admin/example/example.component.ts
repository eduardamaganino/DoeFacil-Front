import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Item } from 'app/modules/item/shared/item.model';
import { ItemService } from 'app/modules/item/shared/item.service';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit{

    itensCollection?: Item[];
    currentItem: Item = {};
    currentIndex = -1;
    debug = true;
    
    constructor(protected itemService: ItemService)
    {
    }

    ngOnInit(): void {
        this.getItens();
      }

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

    
}

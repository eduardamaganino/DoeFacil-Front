import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { Doacao } from 'app/modules/doacao/shared/doacao.model';
import { DoacaoService } from 'app/modules/doacao/shared/doacao.service';
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
    doacao: any;
    
    constructor(protected itemService: ItemService,
        protected doacaoService: DoacaoService,
        protected authService: AuthService)
    {}

    ngOnInit(): void {
        this.getItens();
    }

    getId(): any {
        return this.authService.getCurrentUser().user_id;
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

    pedidoDeDoacao(item: any){
        console.log(this.currentItem);
        this.doacao = {
            item: item.id,
            doador: item.dono,
            donatario: this.getId(),
            recebido: 'Em andamento',
            pedidos: [item.dono],
        }
        console.log(this.doacao);
        this.doacaoService.create(this.doacao)
            .subscribe(data => {
                console.log(data);
            })
        // verifica se ja existe alguma doação deste item
        // se nao
        // cria uma doação e adiciona no pedidos
        // se sim
        // adiciona nos pedidos
    }

    
}

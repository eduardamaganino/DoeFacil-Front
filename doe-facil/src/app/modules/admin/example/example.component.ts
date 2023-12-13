import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ChatComponent } from 'app/modules/chat/chat/chat.component';
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
        protected authService: AuthService,
        protected router: Router,
        private dialog: MatDialog,)
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
            recebido: 0,
            pedidos: [item.dono],
        }
        console.log(this.doacao);
        this.doacaoService.create(this.doacao)
            .subscribe(data => {
                console.log(data);
                // this.router.navigate(['/chat/' + this.doacao.item, 'donee']);
                this.dialog.open(ChatComponent, {
                    data: {
                        donationId: data.item,
                        action: 'donee'
                        },
                    width: '500px',
                    height: '100%',
                    });
        });
    }

    
}

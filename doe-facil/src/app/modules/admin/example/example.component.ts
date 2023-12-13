import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { user } from 'app/mock-api/common/user/data';
import { ChatComponent } from 'app/modules/chat/chat/chat.component';
import { Doacao } from 'app/modules/doacao/shared/doacao.model';
import { DoacaoService } from 'app/modules/doacao/shared/doacao.service';
import { Item } from 'app/modules/item/shared/item.model';
import { ItemService } from 'app/modules/item/shared/item.service';
import { Usuario } from 'app/modules/usuario/shared/usuario.model';
import { UsuarioService } from 'app/modules/usuario/shared/usuario.service';

@Component({
    selector: 'example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {

    itensCollection?: Item[];
    currentItem: Item = {};
    currentIndex = -1;
    debug = true;
    doacao: any;
    currentUserID: any;
    currentUser: Usuario = {};

    constructor(
        protected itemService: ItemService,
        protected doacaoService: DoacaoService,
        protected authService: AuthService,
        protected userService: UsuarioService,
        protected router: Router,
        private dialog: MatDialog,
    ) {}


    ngOnInit(): void {
        this.getItens();
        this.currentUserID = this.getId();
    }

    getId(): any {
        return this.authService.getCurrentUser().user_id;
    }

    getItens() {
        this.itemService.getAll().subscribe(
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

    getUser(id: any, item: any) {
        this.userService.get(id).subscribe(
            data => {
                this.checkDate(data.punicao, data, item);
            },
            error => {
                console.log(error);
            }
        );
    }

    checkDate(userPunicao: Date, user: Usuario, item: any) {
        const currentDate = new Date();
        const punishmentDate = new Date(userPunicao);
        const timeDifference = currentDate.getTime() - punishmentDate.getTime();
        const differenceInDays = timeDifference / (1000 * 3600 * 24);

        if (differenceInDays <= 1) {
            alert('Usuário punido');
            return null;
        } else {
            this.updateUser(user.id, user, item);
        }
    }

    updateUser(id: any, user: Usuario, item: any) {
        this.userService.updatePunicao(user, id).subscribe(() => {
            alert('Usuário atualizado com sucesso');
        });

        this.createdoacao(item);
    }

    createdoacao(item: any) {
        this.doacao = {
            item: item.id,
            doador: item.dono,
            donatario: this.getId(),
            recebido: 0,
            pedidos: [item.dono],
        };
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

    pedidoDeDoacao(item: any) {
        this.getUser(this.currentUserID, item);
    }
}

   


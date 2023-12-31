import { Item } from "app/modules/item/shared/item.model";
import { Usuario } from "app/modules/usuario/shared/usuario.model";
import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Doacao extends BaseResourceModel{
    id?: any;
    item: Item;
    doador: any;
    donatario: Usuario;
    dataDoacao: Date;
    recebido: boolean;
    pedidos: string[];

    static fromJson(jsonData: any): Doacao{
        return Object.assign(new Doacao(), jsonData);
    }
}

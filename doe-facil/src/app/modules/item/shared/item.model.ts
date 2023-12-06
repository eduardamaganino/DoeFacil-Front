import { Usuario } from "app/modules/usuario/shared/usuario.model";
import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Item extends BaseResourceModel{
    itemId?: any;
    titulo?: string;
    motivo?: string;
    quantidade?: number;
    dono?: string;
    fotos?: string;
    tempoDeUso?: string;
    condicao?: string;
    categoria?: any;

    static fromJson(jsonData: any): Item{
        return Object.assign(new Item(), jsonData);
    }
}

export class Categoria extends BaseResourceModel{
    id?: any;
    nome?: number;
       
    static fromJson(jsonData: any): Categoria{
        return Object.assign(new Categoria(), jsonData);
    }
}
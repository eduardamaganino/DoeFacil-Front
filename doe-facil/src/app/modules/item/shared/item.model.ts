import { Usuario } from "app/modules/usuario/shared/usuario.model";
import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Item extends BaseResourceModel{
    id?: any;
    titulo?: string;
    motivo?: string;
    usuario?: Usuario;
    foto?: string;
    tempoDeUso?: string;
    condicao?: string;
    categoria?: number;

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
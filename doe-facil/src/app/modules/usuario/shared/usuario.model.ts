import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Usuario extends BaseResourceModel{
    id?: any;
    nome?: string;
    email?: string;
    senha?: string;
    foto?: string;
    //fotoFundo?: string;
    bio?: string;
    telefone?: number;
    cpf?: string;
    nascimento?: string;
    sexo?: string;
    nota?: string[];
    countAvaliacao: number;
    listaDeDoacao?: string[];
    rua?: number;
    numero?: string;  
    cep?: string;  
    logradouro?: string;  
    cidade?: string;  
    estado?: string;  
    pais?: string;  

    static fromJson(jsonData: any): Usuario{
        return Object.assign(new Usuario(), jsonData);
    }
}

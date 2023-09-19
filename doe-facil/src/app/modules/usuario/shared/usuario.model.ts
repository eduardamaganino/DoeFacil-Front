import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Usuario extends BaseResourceModel{
    id?: any;
    nome?: string;
    email?: string;
    senha?: string;
    fotoPerfil?: string;
    fotoFundo?: string;
    descricao?: string;
    telefone?: number;
    cpf?: string;
    dataNascimento?: any;
    sexo?: string;
    avaliacao?: string[];
    listaDoacao?: string[];
    endereco?: Endereco[];


    static fromJson(jsonData: any): Usuario{
        return Object.assign(new Usuario(), jsonData);
    }
}

export class Endereco extends BaseResourceModel{
    id?: any;
    rua?: number;
    numero?: string;  
    cep?: string;  
    logradouro?: string;  
    cidade?: string;  
    estado?: string;  
    pais?: string;  

    
    static fromJson(jsonData: any): Endereco{
        return Object.assign(new Endereco(), jsonData);
    }
}

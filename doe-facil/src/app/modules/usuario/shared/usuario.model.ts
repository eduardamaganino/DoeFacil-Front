import { BaseResourceModel } from "app/shared/models/base-resource.model";

export class Usuario extends BaseResourceModel{
    userId?: any;
    username?: string;
    email?: string;
    senha?: string;
    foto?: string;
    bio?: string;
    telefone?: number;
    cpf?: string;
    idade?: number;
    punicao?: Date;
    sexo?: string;
    nota?: string[];
    countAvaliacao?: number;
    rua?: string;
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

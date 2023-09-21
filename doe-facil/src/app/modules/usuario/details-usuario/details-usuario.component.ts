import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-details-usuario',
  templateUrl: './details-usuario.component.html',
  styleUrls: ['./details-usuario.component.scss']
})
export class DetailsUsuarioComponent implements OnInit{
  
  checked = false;
  disabled = false;

  usuario: Usuario = {
    nome: '',
    email:'',
    senha: '',
    foto:'',
    //fotoFundo?: string;
    bio: '',
    telefone: 0,
    cpf: '',
    nascimento: '',
    sexo: '',
    nota: [],
    countAvaliacao: 0,
    listaDeDoacao: [],
    rua: 0,
    numero: '',  
    cep: '',  
    logradouro: '',
    cidade: '', 
    estado: '', 
    pais: '',  

  }


  submitted = false;
  debug = true;

  constructor(private usuarioService: UsuarioService,
              ) {}

  ngOnInit(): void {

 
  }

  createUsuario(): void {
    const data = {
      nome: this.usuario.nome,
      email: this.usuario.email,
      senha:  this.usuario.senha,
      foto: this.usuario.foto,
      bio:  this.usuario.bio,
      telefone: this.usuario.telefone,
      cpf: this.usuario.cpf,
      nascimento: this.usuario.nascimento,
      sexo:  this.usuario.sexo,
      nota: this.usuario.nota,
      countAvaliacao:  this.usuario.countAvaliacao,
      listaDeDoacao:  this.usuario.listaDeDoacao,
      rua:  this.usuario.rua,
      numero:  this.usuario.numero, 
      cep:  this.usuario.cep,
      logradouro:  this.usuario.logradouro,
      cidade: this.usuario.cidade,
      estado:  this.usuario.estado, 
      pais:  this.usuario.pais, 
    };

    this.usuarioService.create(data)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.submitted = true;
         
        },
        error => {
          console.log(error);
         
        });
  }

  newUsuario(): void {
    this.submitted = false;
    this.debug = true;

    this.usuario = {
      nome: '',
      email:'',
      senha: '',
      foto:'',
      //fotoFundo?: string;
      bio: '',
      telefone: 0,
      cpf: '',
      nascimento: '',
      sexo: '',
      nota: [],
      countAvaliacao: 0,
      listaDeDoacao: [],
      rua: 0,
      numero: '',  
      cep: '',  
      logradouro: '',
      cidade: '', 
      estado: '', 
      pais: '',  
    }
  
  }

}

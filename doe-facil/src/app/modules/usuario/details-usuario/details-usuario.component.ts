import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadosECidades } from './estados-cidades';

interface Estado {
  nome: string;
  sigla: string;
}

@Component({
  selector: 'app-details-usuario',
  templateUrl: './details-usuario.component.html',
  styleUrls: ['./details-usuario.component.css']
})
export class DetailsUsuarioComponent implements OnInit{

  estados: Estado[] = [
    { nome: 'Acre', sigla: 'AC' },
    { nome: 'Alagoas', sigla: 'AL' },
    { nome: 'Amapá', sigla: 'AP' },
    { nome: 'Amazonas', sigla: 'AM' },
    { nome: 'Bahia', sigla: 'BA' },
    { nome: 'Ceará', sigla: 'CE' },
    { nome: 'Distrito Federal', sigla: 'DF' },
    { nome: 'Espírito Santo', sigla: 'ES' },
    { nome: 'Goiás', sigla: 'GO' },
    { nome: 'Maranhão', sigla: 'MA' },
    { nome: 'Mato Grosso', sigla: 'MT' },
    { nome: 'Mato Grosso do Sul', sigla: 'MS' },
    { nome: 'Minas Gerais', sigla: 'MG' },
    { nome: 'Pará', sigla: 'PA' },
    { nome: 'Paraíba', sigla: 'PB' },
    { nome: 'Paraná', sigla: 'PR' },
    { nome: 'Pernambuco', sigla: 'PE' },
    { nome: 'Piauí', sigla: 'PI' },
    { nome: 'Rio de Janeiro', sigla: 'RJ' },
    { nome: 'Rio Grande do Norte', sigla: 'RN' },
    { nome: 'Rio Grande do Sul', sigla: 'RS' },
    { nome: 'Rondônia', sigla: 'RO' },
    { nome: 'Roraima', sigla: 'RR' },
    { nome: 'Santa Catarina', sigla: 'SC' },
    { nome: 'São Paulo', sigla: 'SP' },
    { nome: 'Sergipe', sigla: 'SE' },
    { nome: 'Tocantins', sigla: 'TO' },
  ];

  cidadesSelecionadas: string[] = [];

  estadosECidades = EstadosECidades;

  checked = false;
  disabled = false;
  edit: boolean;

  usuario: Usuario = new Usuario();

  submitted = false;
  debug = true;
  currentUserID: string;

  constructor(private usuarioService: UsuarioService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.edit = true;
        this.currentUserID = params.id;
        this.getUser(this.currentUserID);
      } else {
        this.edit = false;
      }
    }); 
  }

  getUser(id: any){
    this.usuarioService.get(id).subscribe((usuario) => {
      this.usuario = usuario 
    });
  }

  createUsuario(): void {
    console.log(this.usuario);
    this.usuarioService.create(this.usuario)
      .subscribe(
        response => {
          if (this.debug) console.log(response);
          this.submitted = true;
         
        },
        error => {
          console.log(error);
         
        });
  }
  
  updateUsuario(){
    this.usuarioService.update(this.usuario.userId, this.usuario).subscribe((res)=>{
      alert('Usuario atualizado com sucesso');
    })
  }

  submit(){
    if(this.edit){
      this.updateUsuario();
    }else{
      this.createUsuario();
    }
  }

  delete(){
    if(confirm('Deseja apagar sua conta?')){
      this.usuarioService.delete(this.usuario.userId).subscribe((res)=>{
          this.router.navigate(['item', 'list', 'moda']);
      })
    }
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
      idade: null,
      sexo: '',
      nota: [],
      countAvaliacao: 0,
      rua: '',
      numero: '',  
      cep: '',  
      logradouro: '',
      cidade: '', 
      estado: '', 
      //pais: '',  
    }
  
  }

  estadoSelecionado() {
    const estadoSelecionado = this.usuario.estado;
    const estado = this.estadosECidades.find((item) => item.estado === estadoSelecionado);
  
    if (estado) {
      this.cidadesSelecionadas = estado.cidades;
    } else {
      this.cidadesSelecionadas = []; // Limpa a lista de cidades se nenhum estado for selecionado
    }
  }

      /**
     * Upload avatar
     *
     * @param fileList
     */
      uploadAvatar(fileList: FileList): void
      {
          // Return if canceled
          if ( !fileList.length )
          {
              return;
          }
  
          const allowedTypes = ['image/jpeg', 'image/png'];
          const file = fileList[0];
  
          // Return if the file is not allowed
          if ( !allowedTypes.includes(file.type) )
          {
              return;
          }
  
      }

      removeAvatar(): void
      {
         
      }
}
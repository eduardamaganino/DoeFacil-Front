import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-usuario',
  templateUrl: './details-usuario.component.html',
  styleUrls: ['./details-usuario.component.scss']
})
export class DetailsUsuarioComponent implements OnInit{
  
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
      pais: '',  
    }
  
  }

}

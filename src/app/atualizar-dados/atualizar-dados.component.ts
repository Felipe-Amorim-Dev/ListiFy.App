import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

interface Usuario{
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: string;
  telefone: string;
  fotoPerfil: string;
}


@Component({
  selector: 'app-atualizar-dados',
  templateUrl: './atualizar-dados.component.html',
  styleUrls: ['./atualizar-dados.component.css']
})
export class AtualizarDadosComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_error: string = '';
  selectedFile: File | null = null;
  model: Partial<Usuario> = {}; 
  usuarioID: string = '';

  usuarioData: Usuario = {
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    fotoPerfil: ''
  };

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.spinner.show();

    const data = sessionStorage.getItem('auth_usuario');    
    if (data != null) {      
      this.usuarioID = JSON.parse(data).id;                 
    }

    const getUser = `${environment.listifyUsuario}/usuario?usuarioID=${this.usuarioID}`;

    this.httpClient.get(getUser)
      .subscribe({
        next: (response) => {
          this.usuarioData = response as any;
          this.model = {
            nome: this.usuarioData.nome,
            sobrenome: this.usuarioData.sobrenome,
            email: this.usuarioData.email,
            dataNascimento: this.usuarioData.dataNascimento,
            telefone: this.usuarioData.telefone,
            fotoPerfil: this.usuarioData.fotoPerfil
          };          
        }
      }).add(() =>{
        this.spinner.hide();
      })
  }

  onSubmit(){
    const formData = new FormData();    
    if (this.selectedFile) {
      formData.append('fotoPerfil', this.selectedFile);
    }
    if (this.model.nome) {
      formData.append('nome', this.model.nome);
    }
    if (this.model.sobrenome) {
      formData.append('sobrenome', this.model.sobrenome);        
    }
    if (this.model.email) {
      formData.append('email', this.model.email);        
    }
    if (this.model.dataNascimento) {
      formData.append('dataNascimento', this.model.dataNascimento);
    }
    if (this.model.telefone) {
      formData.append('telefone', this.model.telefone);
    }

    this.spinner.show();

    const url = `${environment.listifyUsuario}/atualizar-dados?usuarioID=${this.usuarioID}`;
    
     this.httpClient.put(url, formData)
        .subscribe(response => {
          this.mensagem_sucesso = `Conta atualizada com sucesso`;        
          window.location.href='/minha-conta'          
        }).add(() => {
          this.spinner.hide();
        });
    }
}

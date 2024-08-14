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
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css']
})
export class MinhaContaComponent implements OnInit {

  mensagem: string = '';
  mensagem_erro: string = ''; 
  
  isAuthenticated = false;
  selectedFile: File | null = null;
  usuarioID: string = '';
  usuarioFotoPerfil: string = '';

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
      this.isAuthenticated = true;             
      this.usuarioID = JSON.parse(data).id;      
    }    

    const getUser = `${environment.listifyUsuario}/usuario?usuarioID=${this.usuarioID}`

    this.httpClient.get(getUser)
      .subscribe({
        next: (response) =>{
          this.usuarioData = response as any;
          this.usuarioFotoPerfil = `data:image/jpeg;base64,${this.usuarioData.fotoPerfil}`;                                      
        }
      }).add(() =>{
        this.spinner.hide();
      })      
  }

  onDeleteUser(usuarioID: string) {    
    const deleteUrl = `${environment.listifyUsuario}/deletar-usuario?usuarioID=${usuarioID}`;    
    if(window.confirm('Deseja realmente encerrar sua conta?')){
      this.httpClient.delete(deleteUrl)
        .subscribe({
          next: (response) => {          
            sessionStorage.clear();
            window.location.href = '/login';
          }        
        });
      }
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-atualizar-senha',
  templateUrl: './atualizar-senha.component.html',
  styleUrls: ['./atualizar-senha.component.css']
})
export class AtualizarSenhaComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_error: string = '';
  usuarioID: string = '';
  model: any = [];


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
    const data = sessionStorage.getItem('auth_usuario');    
    if (data != null) {      
      this.usuarioID = JSON.parse(data).id;                 
    }
  }

  onSubmit(){
    const formData = new FormData();        
    if (this.model.senha) {
      formData.append('senha', this.model.senha);
    }
    if (this.model.senhaConfirmacao) {
      formData.append('senhaConfirmacao', this.model.senhaConfirmacao);        
    }    

    this.spinner.show();

    const url = `${environment.listifyUsuario}/atualizar-senha?usuarioID=${this.usuarioID}`;

    this.httpClient.put(url, formData)
        .subscribe(response => {
          this.mensagem_sucesso = `Senha atualizada com sucesso`;        
          window.location.href='/minha-conta'          
        }).add(() => {
          this.spinner.hide();
        });
    }
}

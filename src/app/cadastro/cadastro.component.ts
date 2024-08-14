import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  mensagem_sucesso: string = '';
  mensagem_error: string = '';
  selectedFile: File | null = null;
  model: any = {}; 

  constructor(
    private httpclient: HttpClient,
    private spinner: NgxSpinnerService
  ){}
  
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('fotoPerfil', this.selectedFile || '');
    formData.append('nome', this.model.nome);
    formData.append('sobrenome', this.model.sobrenome);
    formData.append('email', this.model.email);
    formData.append('senha', this.model.senha);
    formData.append('senhaConfirmacao', this.model.senhaConfirmacao);
    formData.append('dataNascimento', this.model.dataNascimento);
    formData.append('telefone', this.model.telefone);

    if(this.model.senhaConfirmacao == this.model.senha){
    this.spinner.show();

    this.httpclient.post(environment.listifyUsuario + '/criar-conta-usuario', formData)
      .subscribe(response => {
        this.mensagem_sucesso = `Conta ${this.model.nome} ${this.model.sobrenome}, criada com sucesso`;        
        window.location.href='/login'        
      }).add(() => {
        this.spinner.hide();
      });
    }
  }

}

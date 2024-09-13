import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { Router} from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  mensagem_sucesso: string = '';
  mensagem_error: string = '';
  mensagem_error_foto: string = '';
  mensagem_error_senha: string = '';
  selectedFile: File | null = null;
  imagemPreview: string = 'assets/IMG/USER/USER.png';
  model: any = {}; 

  constructor(
    private httpclient: HttpClient,
    private spinner: NgxSpinnerService,
    private route: Router
  ){}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
      this.selectedFile = file;

      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;
      };
      reader.readAsDataURL(file);

    }
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
        this.route.navigate(['/login']);        
      }).add(() => {
        this.spinner.hide();
      });
    }
    else{
      this.mensagem_error_senha = `As senhas não conferem.`
    }
  }

}

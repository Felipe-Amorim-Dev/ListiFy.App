import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EncryptedStorageService } from '../_guards/EncryptData';
import { Injectable } from "@angular/core";
import { Router} from '@angular/router';

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
    private spinner: NgxSpinnerService,
    private encrypt: EncryptedStorageService,
    private route: Router
  ){}

  ngOnInit(): void {
    const data = this.encrypt.getItem('auth_usuario');    
    if (data != null) {      
      this.usuarioID = data.id;                 
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
          this.route.navigate(['/minha-conta']);
        }).add(() => {
          this.spinner.hide();
        });
    }
}

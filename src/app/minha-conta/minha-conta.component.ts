import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EncryptedStorageService } from '../_guards/EncryptData';
import { Injectable } from "@angular/core";
import { Router} from '@angular/router';

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
  modalVisible = false;
  
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
    private spinner: NgxSpinnerService,
    private encrypt: EncryptedStorageService,
    private route: Router
  ){}

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.spinner.show();

    const data = this.encrypt.getItem('auth_usuario');    
    if (data != null) {
      this.isAuthenticated = true;             
      this.usuarioID = data.id;      
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
  
      this.httpClient.delete(deleteUrl)
        .subscribe({
          next: (response) => {          
            this.encrypt.removeItem('auth_usuario');
            this.route.navigate(['/home']);
          }        
        });
  }

  showModal(){
    this.modalVisible = true;
  }

  closeModal(){
    this.modalVisible = false;
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { EncryptedStorageService } from '../_guards/EncryptData';
import { Injectable } from "@angular/core";
import { Router} from '@angular/router';
import { Subscription } from 'rxjs';

interface Usuario{
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: string;
  telefone: string;  
  fotoPerfil: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  private getUsuario!: Subscription;

  isOpen = false;
  isSmallScreen = false;

  isAuthenticated: boolean = false;
  usuarioID: string = '';

  modalVisible = false;

  usuarioData: Usuario = {
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    fotoPerfil: ''   
  };

  usuarioFotoPerfil: string = '';  

  constructor(
    private httpCliente: HttpClient,
    private cdr: ChangeDetectorRef,
    private encrypt: EncryptedStorageService,
    private route: Router
  ){}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }
  
  ngOnInit(): void {
    const data = this.encrypt.getItem('auth_usuario');    
    if (data != null) {
      this.isAuthenticated = true; 
      this.usuarioID = data.id;      
    }

    this.checkScreenSize();

    const getUser = `${environment.listifyUsuario}/usuario?usuarioID=${this.usuarioID}`

    this.getUsuario = this.httpCliente.get(getUser)
      .subscribe({
        next: (response) =>{
          this.usuarioData = response as any;
          this.usuarioFotoPerfil = `data:image/jpeg;base64,${this.usuarioData.fotoPerfil}`;                                      
        }
      })
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
    this.cdr.detectChanges();
  }
  
  logout(): void {    
      this.encrypt.removeItem('auth_usuario');      
      this.route.navigate(['/login']);
  }

  showModal(){
    this.modalVisible = true;
  }

  closeModal(){
    this.modalVisible = false;
  }

  ngOnDestroy(): void {
    if(this.getUsuario){
      this.getUsuario.unsubscribe();
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { HostListener } from '@angular/core';

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
export class NavbarComponent implements OnInit{

  isOpen = false;
  isSmallScreen = false;

  isAuthenticated: boolean = false;
  usuarioID: string = '';

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
    private cdr: ChangeDetectorRef
  ){}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }
  
  ngOnInit(): void {
    const data = sessionStorage.getItem('auth_usuario');    
    if (data != null) {
      this.isAuthenticated = true; 
      this.usuarioID = JSON.parse(data).id      
    }

    this.checkScreenSize();

    const getUser = `${environment.listifyUsuario}/usuario?usuarioID=${this.usuarioID}`

    this.httpCliente.get(getUser)
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
    if (window.confirm('Deseja realmente sair?')) {
      sessionStorage.clear();      
      window.location.href = '/login';
    }
  }
}

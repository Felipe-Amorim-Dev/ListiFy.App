import { Component, OnInit } from '@angular/core';
import { EncryptedStorageService } from '../_guards/EncryptData';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isAuthenticated = false;  

  constructor(
    private encrypt: EncryptedStorageService
  ){}

  ngOnInit(): void {
     const data = this.encrypt.getItem('auth_usuario');    
    if (data != null) {
      this.isAuthenticated = true;            
    }
  }
}

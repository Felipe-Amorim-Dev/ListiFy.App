import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EncryptedStorageService } from '../_guards/EncryptData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  usuarioId: string = '';
  usuarioNome: string = '';  
  model: any = {};
  selectedFiles: File[] = [];
  allItems: any[] = [];
  filteredItems: any[] = [];
  searchTitle: string = ''; 

  currentIndex: number = 0;

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private encrypt: EncryptedStorageService
  ){}

  ngOnInit(): void {
    this.spinner.show();
    const data = this.encrypt.getItem('auth_usuario');    
    if (data != null) {      
      this.usuarioId = data.id;
      this.usuarioNome = data.nome;
    }    
    this.fetchItems();
  }  

  fetchItems() {
    const fetchUrl = `${environment.listifyItem}/consultar-item?usuarioID=${this.usuarioId}`;
    this.httpClient.get<any[]>(fetchUrl).subscribe(items => {
      this.allItems = items;
      this.filteredItems = items;
      this.spinner.hide();
    });
  }

  filterItems() {
    if (this.searchTitle.trim() === '') {
      this.filteredItems = this.allItems;
    } else {
      this.filteredItems = this.allItems.filter(item => 
        item.titulo.toLowerCase().includes(this.searchTitle.toLowerCase()));
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.model.galeria.length - 1) {
      this.currentIndex++;
    }
  }

  onDelete(itemId: string) {    
    const deleteUrl = `${environment.listifyItem}/remover-item?id=${itemId}&usuarioID=${this.usuarioId}`;
    if(window.confirm('Deseja excluir o item?')){
      this.httpClient.delete(deleteUrl)
      .subscribe({
        next: (response) => {                            
          this.ngOnInit();
        }        
      });
    }    
  }    
}

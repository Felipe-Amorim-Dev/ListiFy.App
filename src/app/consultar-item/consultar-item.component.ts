import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { EncryptedStorageService } from '../_guards/EncryptData';

interface Item {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  tipo: string;
  dataLancamento: string;
  dataCriacao: string;
  galeria: Galeria[];
}

interface Galeria {
  id: string;
  foto: string;
  itemId: string;
  item: Item;
}

interface ConsultarItemsResponseModel {
  items: Item[];
}


@Component({
  selector: 'app-consultar-item',
  templateUrl: './consultar-item.component.html',
  styleUrls: ['./consultar-item.component.css']
})
export class ConsultarItemComponent implements OnInit {

  mensagem: string = '';
  mensagem_erro: string = '';
  
  items: Item[] = [];     
  usuarioId: string = '';
  usuarioNome: string = '';  
  searchItem: string = '';

  currentIndex: number[] = [];

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

    const url = `${environment.listifyItem}/consultar-item?usuarioID=${this.usuarioId}`;
    
    this.httpClient.get<ConsultarItemsResponseModel>(url)
      .subscribe({
        next: (response) => {
          this.items = response as any;                    
          this.currentIndex = new Array(this.items.length).fill(0);                    
        },
        error: (error) => {
          this.mensagem_erro = 'Você não possui itens no seu catálogo.';
          console.error(error);
        }
      }).add(() => {
        this.spinner.hide();
      });
    
  }  

  nextSlide(index: number, length: number) {
    this.currentIndex[index] = (this.currentIndex[index] + 1) % length;
  }

  prevSlide(index: number, length: number) {
    this.currentIndex[index] = (this.currentIndex[index] - 1 + length) % length;
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

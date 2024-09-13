import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Tipo } from '../Enums/tipo.enum';
import { Categoria } from '../Enums/categoria.enum';
import { EncryptedStorageService } from '../_guards/EncryptData';

@Component({
  selector: 'app-atualizar-item',
  templateUrl: './atualizar-item.component.html',
  styleUrls: ['./atualizar-item.component.css']
})
export class AtualizarItemComponent implements OnInit {

  itemId: string = '';
  mensagem_sucesso: string = '';
  mensagem_error: string = '';
  selectedFiles: File[] = [];
  model: any = {};
  usuarioID: string = '';  
  tipoEnum = Tipo;
  categoriaEnum = Categoria;


  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private encrypt: EncryptedStorageService
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    this.itemId = this.route.snapshot.paramMap.get('id') as string;
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
    });
    
    const data = this.encrypt.getItem('auth_usuario');    
    if (data != null) {
      this.usuarioID = data.id;
    }

    const url = `${environment.listifyItem}/consultar-item-id?usuarioID=${this.usuarioID}&itemId=${this.itemId}`;      

    this.httpClient.get(url)
      .subscribe({
        next: (model) => {
          this.model = model;                                                  
        },
        error: (error) => {
          this.mensagem_error = 'Ocorreu um erro ao consultar o item.';          
        }
      }).add(() => {
        this.spinner.hide();
      });
  }

  onFileSelected(event: any) {
    if (event.target.files.length + this.selectedFiles.length > 5) {
      this.mensagem_error = 'Você pode enviar no máximo 5 fotos.';
      return;
    }
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFiles.push(event.target.files[i]);
    }
  }

  onSubmit() {
    this.spinner.show();
    const formData = new FormData();
    for (let file of this.selectedFiles) {
      formData.append('galeria', file);
    }
    formData.append('titulo', this.model.titulo);
    formData.append('descricao', this.model.descricao);
    formData.append('categoria', this.model.categoria);
    formData.append('tipo', this.model.tipo);
    if (this.model.dataLancamento) {
      formData.append('dataLancamento', this.model.dataLancamento);
    }

    if (this.model.titulo && this.model.categoria && this.model.tipo != null) {
      const updateUrl = `${environment.listifyItem}/atualizar-item?usuarioID=${this.usuarioID}&itemId=${this.itemId}`;
      this.httpClient.put(updateUrl, formData)
        .subscribe({
          next: (response) => {
            this.mensagem_sucesso = `Item ${this.model.titulo} atualizado com sucesso.`;
            this.ngOnInit();
          },
          error: (error) => {
            this.mensagem_error = 'Ocorreu um erro ao atualizar o item.';            
          }
        }).add(() => {
          this.spinner.hide();
        });
    } else {
      this.mensagem_error = 'Preencha todos os campos obrigatórios (*)';
      this.spinner.hide();
    }
  }

  onDeleteFoto(index: number) {
    let fotoId = this.model.galeria[index].id
    const deleteUrl = `${environment.listifyItem}/deletar-foto?itemId=${this.itemId}&fotoId=${fotoId}`;    
    this.httpClient.delete(deleteUrl)
      .subscribe({
        next: (response) => {
          this.mensagem_sucesso = 'Foto deletada com sucesso.';          
          this.ngOnInit();
        },
        error: (error) => {
          this.mensagem_error = 'Ocorreu um erro ao deletar a foto.';          
        }
      });
  }
}
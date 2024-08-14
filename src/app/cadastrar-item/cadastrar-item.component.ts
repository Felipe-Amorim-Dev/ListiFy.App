import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { Tipo } from '../Enums/tipo.enum';
import { Categoria } from '../Enums/categoria.enum';

@Component({
  selector: 'app-cadastrar-item',
  templateUrl: './cadastrar-item.component.html',
  styleUrls: ['./cadastrar-item.component.css']
})
export class CadastrarItemComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_error: string = '';
  selectedFiles: File[] = [];
  model: any = {}; 
  tipoEnum = Tipo;
  categoriaEnum = Categoria;
  usuarioID: string = '';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
    const data = sessionStorage.getItem('auth_usuario');    
    if (data != null) {      
      this.usuarioID = JSON.parse(data).id;                 
    }
  } 

  onFileSelected(event: any){
    if (event.target.files.length + this.selectedFiles.length > 5) {
      this.mensagem_error = 'Você pode enviar no máximo 5 fotos.';
      return;
    }
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFiles.push(event.target.files[i]);
    }
  }

  onSubmit() {
    const formData = new FormData();
    for (let file of this.selectedFiles) {
      formData.append('galeria', file);
    }
    formData.append('titulo', this.model.titulo);
    formData.append('descricao', this.model.descricao);
    formData.append('categoria', this.model.categoria);
    formData.append('tipo', this.model.tipo);
    if(this.model.dataLancamento){
      formData.append('dataLancamento', this.model.dataLancamento);
    }    

    if (this.model.titulo && this.model.categoria && this.model.tipo != null) {
      this.spinner.show();

      const url = `${environment.listifyItem}/cadastrar-item?usuarioID=${this.usuarioID}`;

      this.httpClient.post(url, formData)
        .subscribe({
          next: (response) => {
            this.mensagem_sucesso = `Item ${this.model.titulo} criado com sucesso`;                                           
          }          
        }).add(() => {
          this.spinner.hide();
        });
    } else {
      this.mensagem_error = 'Preencha todos os campos obrigatórios (*)';
    }
  }
}

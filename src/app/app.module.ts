import { NgModule, signal } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { SigninGuard } from './_guards/signin.guard';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CadastrarItemComponent } from './cadastrar-item/cadastrar-item.component';
import { ConsultarItemComponent } from './consultar-item/consultar-item.component';
import { AtualizarDadosComponent } from './atualizar-dados/atualizar-dados.component';
import { AtualizarItemComponent } from './atualizar-item/atualizar-item.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { AtualizarSenhaComponent } from './atualizar-senha/atualizar-senha.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SacComponent } from './sac/sac.component';
import { ModalSairComponent } from './modal-sair/modal-sair.component';
import { ModalExcluirComponent } from './modal-excluir/modal-excluir.component';

const routes: Routes = [
  { path : '', pathMatch : 'full', redirectTo : 'login' },
  {path : 'login', component : LoginComponent, canActivate: [SigninGuard]},
  {path : 'cadastro', component : CadastroComponent, canActivate: [SigninGuard]},
  {path : 'atualizar-dados', component : AtualizarDadosComponent, canActivate: [AuthenticationGuard]},
  {path : 'cadastrar-item', component : CadastrarItemComponent, canActivate: [AuthenticationGuard]},  
  {path : 'atualizar-item/:id', component : AtualizarItemComponent, canActivate: [AuthenticationGuard]},
  {path : 'consultar-item', component : ConsultarItemComponent, canActivate: [AuthenticationGuard]},
  {path : 'minha-conta', component : MinhaContaComponent, canActivate: [AuthenticationGuard]},
  {path : 'atualizar-senha', component : AtualizarSenhaComponent, canActivate: [AuthenticationGuard]},
  {path : 'main', component : MainComponent, canActivate: [AuthenticationGuard]},
  {path : 'home', component : HomeComponent},
  {path : 'sobre', component : AboutComponent},
  {path : 'sac', component : SacComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    CadastrarItemComponent,
    ConsultarItemComponent,
    AtualizarDadosComponent,
    AtualizarItemComponent,
    MinhaContaComponent,
    AtualizarSenhaComponent,
    MainComponent,
    HomeComponent,
    AboutComponent,
    SacComponent,
    ModalSairComponent,
    ModalExcluirComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarSenhaComponent } from './atualizar-senha.component';

describe('AtualizarSenhaComponent', () => {
  let component: AtualizarSenhaComponent;
  let fixture: ComponentFixture<AtualizarSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtualizarSenhaComponent]
    });
    fixture = TestBed.createComponent(AtualizarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

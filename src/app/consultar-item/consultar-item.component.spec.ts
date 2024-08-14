import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarItemComponent } from './consultar-item.component';

describe('ConsultarItemComponent', () => {
  let component: ConsultarItemComponent;
  let fixture: ComponentFixture<ConsultarItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarItemComponent]
    });
    fixture = TestBed.createComponent(ConsultarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLinhaComponent } from './lista-linha.component';

describe('ListaLinhaComponent', () => {
  let component: ListaLinhaComponent;
  let fixture: ComponentFixture<ListaLinhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLinhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

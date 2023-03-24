import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharLinhaComponent } from './detalhar-linha.component';

describe('DetalharLinhaComponent', () => {
  let component: DetalharLinhaComponent;
  let fixture: ComponentFixture<DetalharLinhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalharLinhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharLinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

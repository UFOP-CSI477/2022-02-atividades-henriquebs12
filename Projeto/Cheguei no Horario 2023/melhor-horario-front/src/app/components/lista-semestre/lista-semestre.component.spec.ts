import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSemestreComponent } from './lista-semestre.component';

describe('ListaSemestreComponent', () => {
  let component: ListaSemestreComponent;
  let fixture: ComponentFixture<ListaSemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSemestreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

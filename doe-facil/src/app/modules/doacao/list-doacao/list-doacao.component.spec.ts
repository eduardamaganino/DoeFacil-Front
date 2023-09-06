import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoacaoComponent } from './list-doacao.component';

describe('ListDoacaoComponent', () => {
  let component: ListDoacaoComponent;
  let fixture: ComponentFixture<ListDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDoacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

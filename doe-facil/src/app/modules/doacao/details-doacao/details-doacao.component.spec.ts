import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDoacaoComponent } from './details-doacao.component';

describe('DetailsDoacaoComponent', () => {
  let component: DetailsDoacaoComponent;
  let fixture: ComponentFixture<DetailsDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDoacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

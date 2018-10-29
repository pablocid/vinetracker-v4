import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericListComponent } from './numeric-list.component';

describe('NumericListComponent', () => {
  let component: NumericListComponent;
  let fixture: ComponentFixture<NumericListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

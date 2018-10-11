import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowsModalComponent } from './rows-modal.component';

describe('RowsModalComponent', () => {
  let component: RowsModalComponent;
  let fixture: ComponentFixture<RowsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionImgComponent } from './selection-img.component';

describe('SelectionImgComponent', () => {
  let component: SelectionImgComponent;
  let fixture: ComponentFixture<SelectionImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

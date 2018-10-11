import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowPage } from './row.page';

describe('RowPage', () => {
  let component: RowPage;
  let fixture: ComponentFixture<RowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

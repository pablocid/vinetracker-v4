import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributePage } from './attribute.page';

describe('AttributePage', () => {
  let component: AttributePage;
  let fixture: ComponentFixture<AttributePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

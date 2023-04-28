/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListProductCaseComponent } from './list-product-case.component';

describe('ListProductCaseComponent', () => {
  let component: ListProductCaseComponent;
  let fixture: ComponentFixture<ListProductCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

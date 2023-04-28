/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListProductPsuComponent } from './list-product-psu.component';

describe('ListProductPsuComponent', () => {
  let component: ListProductPsuComponent;
  let fixture: ComponentFixture<ListProductPsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductPsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductPsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

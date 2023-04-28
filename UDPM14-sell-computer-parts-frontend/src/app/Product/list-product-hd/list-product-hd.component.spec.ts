/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListProductHdComponent } from './list-product-hd.component';

describe('ListProductHdComponent', () => {
  let component: ListProductHdComponent;
  let fixture: ComponentFixture<ListProductHdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductHdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductHdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

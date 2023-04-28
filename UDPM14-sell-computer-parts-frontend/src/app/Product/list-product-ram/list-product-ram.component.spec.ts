/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListProductRamComponent } from './list-product-ram.component';

describe('ListProductRamComponent', () => {
  let component: ListProductRamComponent;
  let fixture: ComponentFixture<ListProductRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

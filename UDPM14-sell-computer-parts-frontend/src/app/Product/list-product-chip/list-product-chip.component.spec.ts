/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListProductChipComponent } from './list-product-chip.component';

describe('ListProductChipComponent', () => {
  let component: ListProductChipComponent;
  let fixture: ComponentFixture<ListProductChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

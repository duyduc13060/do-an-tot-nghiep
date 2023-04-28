/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListChipComponent } from './list-chip.component';

describe('ListChipComponent', () => {
  let component: ListChipComponent;
  let fixture: ComponentFixture<ListChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

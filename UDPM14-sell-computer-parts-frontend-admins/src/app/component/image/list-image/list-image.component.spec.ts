/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListImageComponent } from './list-image.component';

describe('ListImageComponent', () => {
  let component: ListImageComponent;
  let fixture: ComponentFixture<ListImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

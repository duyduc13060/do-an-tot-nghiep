import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHdComponent } from './add-hd.component';

describe('AddHdComponent', () => {
  let component: AddHdComponent;
  let fixture: ComponentFixture<AddHdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

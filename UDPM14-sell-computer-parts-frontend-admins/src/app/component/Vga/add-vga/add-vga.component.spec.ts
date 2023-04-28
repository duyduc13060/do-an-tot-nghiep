import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVgaComponent } from './add-vga.component';

describe('AddVgaComponent', () => {
  let component: AddVgaComponent;
  let fixture: ComponentFixture<AddVgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVgaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

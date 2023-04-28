import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVgaComponent } from './edit-vga.component';

describe('EditVgaComponent', () => {
  let component: EditVgaComponent;
  let fixture: ComponentFixture<EditVgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVgaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

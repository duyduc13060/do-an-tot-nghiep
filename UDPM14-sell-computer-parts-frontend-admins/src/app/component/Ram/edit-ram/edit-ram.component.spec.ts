import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRamComponent } from './edit-ram.component';

describe('EditRamComponent', () => {
  let component: EditRamComponent;
  let fixture: ComponentFixture<EditRamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

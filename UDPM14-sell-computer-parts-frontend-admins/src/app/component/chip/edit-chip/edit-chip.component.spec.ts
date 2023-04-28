import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChipComponent } from './edit-chip.component';

describe('EditChipComponent', () => {
  let component: EditChipComponent;
  let fixture: ComponentFixture<EditChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

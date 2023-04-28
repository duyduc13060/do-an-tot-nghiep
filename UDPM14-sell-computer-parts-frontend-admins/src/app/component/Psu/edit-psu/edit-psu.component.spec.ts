import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPsuComponent } from './edit-psu.component';

describe('EditPsuComponent', () => {
  let component: EditPsuComponent;
  let fixture: ComponentFixture<EditPsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPsuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

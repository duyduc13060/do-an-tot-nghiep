import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHdComponent } from './edit-hd.component';

describe('EditHdComponent', () => {
  let component: EditHdComponent;
  let fixture: ComponentFixture<EditHdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPsuComponent } from './add-psu.component';

describe('AddPsuComponent', () => {
  let component: AddPsuComponent;
  let fixture: ComponentFixture<AddPsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPsuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

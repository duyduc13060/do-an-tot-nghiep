import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMainComponent } from './add-main.component';

describe('AddMainComponent', () => {
  let component: AddMainComponent;
  let fixture: ComponentFixture<AddMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

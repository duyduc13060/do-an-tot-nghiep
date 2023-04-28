import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupComponentComponent } from './edit-group-component.component';

describe('EditGroupComponentComponent', () => {
  let component: EditGroupComponentComponent;
  let fixture: ComponentFixture<EditGroupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGroupComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGroupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

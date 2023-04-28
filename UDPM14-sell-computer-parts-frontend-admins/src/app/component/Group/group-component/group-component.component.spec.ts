import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComponentComponent } from './group-component.component';

describe('GroupComponentComponent', () => {
  let component: GroupComponentComponent;
  let fixture: ComponentFixture<GroupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

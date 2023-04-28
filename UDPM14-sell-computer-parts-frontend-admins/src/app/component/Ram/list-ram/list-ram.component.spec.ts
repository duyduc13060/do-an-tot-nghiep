import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRamComponent } from './list-ram.component';

describe('ListRamComponent', () => {
  let component: ListRamComponent;
  let fixture: ComponentFixture<ListRamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPsuComponent } from './list-psu.component';

describe('ListPsuComponent', () => {
  let component: ListPsuComponent;
  let fixture: ComponentFixture<ListPsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPsuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

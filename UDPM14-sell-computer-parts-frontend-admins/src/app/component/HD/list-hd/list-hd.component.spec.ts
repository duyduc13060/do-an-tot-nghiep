import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHdComponent } from './list-hd.component';

describe('ListHdComponent', () => {
  let component: ListHdComponent;
  let fixture: ComponentFixture<ListHdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

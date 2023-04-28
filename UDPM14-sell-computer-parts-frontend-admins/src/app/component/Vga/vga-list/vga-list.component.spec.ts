import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VgaListComponent } from './vga-list.component';

describe('VgaListComponent', () => {
  let component: VgaListComponent;
  let fixture: ComponentFixture<VgaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VgaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VgaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

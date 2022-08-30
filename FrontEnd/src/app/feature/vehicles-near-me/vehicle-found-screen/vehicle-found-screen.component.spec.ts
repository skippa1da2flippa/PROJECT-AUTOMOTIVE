import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFoundScreenComponent } from './vehicle-found-screen.component';

describe('VehicleFoundScreenComponent', () => {
  let component: VehicleFoundScreenComponent;
  let fixture: ComponentFixture<VehicleFoundScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleFoundScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleFoundScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

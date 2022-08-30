import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleControlScreenComponent } from './vehicle-control-screen.component';

describe('VehicleControlScreenComponent', () => {
  let component: VehicleControlScreenComponent;
  let fixture: ComponentFixture<VehicleControlScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleControlScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleControlScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

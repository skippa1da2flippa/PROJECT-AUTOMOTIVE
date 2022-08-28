import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesNearMeScreenComponent } from './vehicles-near-me-screen.component';

describe('VehiclesNearMeScreenComponent', () => {
  let component: VehiclesNearMeScreenComponent;
  let fixture: ComponentFixture<VehiclesNearMeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesNearMeScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesNearMeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

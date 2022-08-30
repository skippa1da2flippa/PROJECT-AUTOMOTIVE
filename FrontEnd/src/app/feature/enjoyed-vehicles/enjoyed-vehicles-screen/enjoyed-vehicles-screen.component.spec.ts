import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnjoyedVehiclesScreenComponent } from './enjoyed-vehicles-screen.component';

describe('EnjoyedVehiclesScreenComponent', () => {
  let component: EnjoyedVehiclesScreenComponent;
  let fixture: ComponentFixture<EnjoyedVehiclesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnjoyedVehiclesScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnjoyedVehiclesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

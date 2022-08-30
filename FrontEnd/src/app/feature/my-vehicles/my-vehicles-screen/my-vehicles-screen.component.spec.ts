import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehiclesScreenComponent } from './my-vehicles-screen.component';

describe('MyVehiclesScreenComponent', () => {
  let component: MyVehiclesScreenComponent;
  let fixture: ComponentFixture<MyVehiclesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVehiclesScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyVehiclesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

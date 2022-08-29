import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsScreenComponent } from './maps-screen.component';

describe('MapsScreenComponent', () => {
  let component: MapsScreenComponent;
  let fixture: ComponentFixture<MapsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinesScreenComponent } from './routines-screen.component';

describe('RoutinesScreenComponent', () => {
  let component: RoutinesScreenComponent;
  let fixture: ComponentFixture<RoutinesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutinesScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutinesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

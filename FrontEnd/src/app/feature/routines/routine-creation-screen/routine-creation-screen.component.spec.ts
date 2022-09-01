import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineCreationScreenComponent } from './routine-creation-screen.component';

describe('RoutineCreationScreenComponent', () => {
  let component: RoutineCreationScreenComponent;
  let fixture: ComponentFixture<RoutineCreationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineCreationScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutineCreationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

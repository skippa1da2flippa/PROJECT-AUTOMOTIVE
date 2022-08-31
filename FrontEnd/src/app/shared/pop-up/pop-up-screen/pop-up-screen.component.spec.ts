import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpScreenComponent } from './pop-up-screen.component';

describe('PopUpScreenComponent', () => {
  let component: PopUpScreenComponent;
  let fixture: ComponentFixture<PopUpScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

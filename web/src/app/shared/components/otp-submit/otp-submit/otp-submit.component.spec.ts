import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSubmitComponent } from './otp-submit.component';

describe('OtpSubmitComponent', () => {
  let component: OtpSubmitComponent;
  let fixture: ComponentFixture<OtpSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

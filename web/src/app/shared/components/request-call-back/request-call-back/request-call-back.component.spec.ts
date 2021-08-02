import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCallBackComponent } from './request-call-back.component';

describe('RequestCallBackComponent', () => {
  let component: RequestCallBackComponent;
  let fixture: ComponentFixture<RequestCallBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCallBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCallBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

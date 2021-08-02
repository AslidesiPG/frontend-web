import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveRatingComponent } from './give-rating.component';

describe('GiveRatingComponent', () => {
  let component: GiveRatingComponent;
  let fixture: ComponentFixture<GiveRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

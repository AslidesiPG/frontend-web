import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactForPriceComponent } from './contact-for-price.component';

describe('ContactForPriceComponent', () => {
  let component: ContactForPriceComponent;
  let fixture: ComponentFixture<ContactForPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactForPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactForPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

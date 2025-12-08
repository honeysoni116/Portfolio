import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySales } from './country-sales';

describe('CountrySales', () => {
  let component: CountrySales;
  let fixture: ComponentFixture<CountrySales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

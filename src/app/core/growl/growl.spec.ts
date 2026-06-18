import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Growl } from './growl';

describe('Growl', () => {
  let component: Growl;
  let fixture: ComponentFixture<Growl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Growl],
    }).compileComponents();

    fixture = TestBed.createComponent(Growl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

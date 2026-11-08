import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommuniqueCard } from './communique-card';

describe('CommuniqueCard', () => {
  let component: CommuniqueCard;
  let fixture: ComponentFixture<CommuniqueCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommuniqueCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CommuniqueCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

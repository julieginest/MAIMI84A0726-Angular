import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommuniqueContent } from './communique-content';

describe('CommuniqueContent', () => {
  let component: CommuniqueContent;
  let fixture: ComponentFixture<CommuniqueContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommuniqueContent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommuniqueContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

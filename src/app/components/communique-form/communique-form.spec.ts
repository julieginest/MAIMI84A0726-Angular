import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommuniqueForm } from './communique-form';

describe('CommuniqueForm', () => {
  let component: CommuniqueForm;
  let fixture: ComponentFixture<CommuniqueForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommuniqueForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CommuniqueForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

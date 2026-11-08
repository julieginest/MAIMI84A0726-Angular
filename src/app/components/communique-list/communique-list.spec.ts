import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommuniqueList } from './communique-list';

describe('CommuniqueList', () => {
  let component: CommuniqueList;
  let fixture: ComponentFixture<CommuniqueList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommuniqueList],
    }).compileComponents();

    fixture = TestBed.createComponent(CommuniqueList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

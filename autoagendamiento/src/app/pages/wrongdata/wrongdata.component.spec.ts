import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongdataComponent } from './wrongdata.component';

describe('WrongdataComponent', () => {
  let component: WrongdataComponent;
  let fixture: ComponentFixture<WrongdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

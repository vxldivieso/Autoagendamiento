import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndProcessComponent } from './end-process.component';

describe('EndProcessComponent', () => {
  let component: EndProcessComponent;
  let fixture: ComponentFixture<EndProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

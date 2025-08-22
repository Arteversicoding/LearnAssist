import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FindMateriPageComponent } from './find-materi-page.component';

describe('FindMateriPageComponent', () => {
  let component: FindMateriPageComponent;
  let fixture: ComponentFixture<FindMateriPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FindMateriPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FindMateriPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

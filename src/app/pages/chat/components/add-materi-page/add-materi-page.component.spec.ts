import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddMateriPageComponent } from './add-materi-page.component';

describe('AddMateriPageComponent', () => {
  let component: AddMateriPageComponent;
  let fixture: ComponentFixture<AddMateriPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AddMateriPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMateriPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

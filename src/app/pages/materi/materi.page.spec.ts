import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MateriPage } from './materi.page';

describe('MateriPage', () => {
  let component: MateriPage;
  let fixture: ComponentFixture<MateriPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCarPage } from './edit-car.page';

describe('EditCarPage', () => {
  let component: EditCarPage;
  let fixture: ComponentFixture<EditCarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

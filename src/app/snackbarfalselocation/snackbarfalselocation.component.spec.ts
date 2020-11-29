import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarfalselocationComponent } from './snackbarfalselocation.component';

describe('SnackbarfalselocationComponent', () => {
  let component: SnackbarfalselocationComponent;
  let fixture: ComponentFixture<SnackbarfalselocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarfalselocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarfalselocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

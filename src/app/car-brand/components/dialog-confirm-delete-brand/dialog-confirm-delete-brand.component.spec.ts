import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmDeleteBrandComponent } from './dialog-confirm-delete-brand.component';

describe('DialogConfirmDeleteBrandComponent', () => {
  let component: DialogConfirmDeleteBrandComponent;
  let fixture: ComponentFixture<DialogConfirmDeleteBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmDeleteBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmDeleteBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUpdateBrandComponent } from './dialog-add-update-brand.component';

describe('DialogAddUpdateBrandComponent', () => {
  let component: DialogAddUpdateBrandComponent;
  let fixture: ComponentFixture<DialogAddUpdateBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddUpdateBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUpdateBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

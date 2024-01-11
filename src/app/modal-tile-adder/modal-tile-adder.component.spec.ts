import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTileAdderComponent } from './modal-tile-adder.component';

describe('ModalTileAdderComponent', () => {
  let component: ModalTileAdderComponent;
  let fixture: ComponentFixture<ModalTileAdderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTileAdderComponent]
    });
    fixture = TestBed.createComponent(ModalTileAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

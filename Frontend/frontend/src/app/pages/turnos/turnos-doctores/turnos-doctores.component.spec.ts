import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosDoctoresComponent } from './turnos-doctores.component';

describe('TurnosDoctoresComponent', () => {
  let component: TurnosDoctoresComponent;
  let fixture: ComponentFixture<TurnosDoctoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurnosDoctoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

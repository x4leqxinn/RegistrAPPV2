import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscarAsistenciaAlumnoPage } from './buscar-asistencia-alumno.page';

describe('BuscarAsistenciaAlumnoPage', () => {
  let component: BuscarAsistenciaAlumnoPage;
  let fixture: ComponentFixture<BuscarAsistenciaAlumnoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarAsistenciaAlumnoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarAsistenciaAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

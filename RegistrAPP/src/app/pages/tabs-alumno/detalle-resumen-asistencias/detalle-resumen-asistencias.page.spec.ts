import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleResumenAsistenciasPage } from './detalle-resumen-asistencias.page';

describe('DetalleResumenAsistenciasPage', () => {
  let component: DetalleResumenAsistenciasPage;
  let fixture: ComponentFixture<DetalleResumenAsistenciasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleResumenAsistenciasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleResumenAsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

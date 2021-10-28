import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaAsistenciaProfesorPage } from './lista-asistencia-profesor.page';

describe('ListaAsistenciaProfesorPage', () => {
  let component: ListaAsistenciaProfesorPage;
  let fixture: ComponentFixture<ListaAsistenciaProfesorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAsistenciaProfesorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAsistenciaProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

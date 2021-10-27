import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./pages/iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: '',
    redirectTo: 'iniciar-sesion',
    pathMatch: 'full'
  },
  {
    path: 'recuperar-cuenta',
    loadChildren: () => import('./pages/recuperar-cuenta/recuperar-cuenta.module').then( m => m.RecuperarCuentaPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  { ///
    path: 'inicio/:username',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'codigo-qr',
    loadChildren: () => import('./pages/codigo-qr/codigo-qr.module').then( m => m.CodigoQRPageModule)
  },
  {
    path: 'tabs-alumno',
    loadChildren: () => import('./pages/tabs-alumno/tabs-alumno.module').then( m => m.TabsAlumnoPageModule)
  },
  {
    path: 'tabs-profesor',
    loadChildren: () => import('./pages/tabs-profesor/tabs-profesor.module').then( m => m.TabsProfesorPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'cambiar-contrasenia/:username',
    loadChildren: () => import('./pages/cambiar-contrasenia/cambiar-contrasenia.module').then( m => m.CambiarContraseniaPageModule)
  },  {
    path: 'cursos-profesor',
    loadChildren: () => import('./pages/cursos-profesor/cursos-profesor.module').then( m => m.CursosProfesorPageModule)
  },
  {
    path: 'asignaturas-profesor',
    loadChildren: () => import('./pages/asignaturas-profesor/asignaturas-profesor.module').then( m => m.AsignaturasProfesorPageModule)
  },
  {
    path: 'asignaturas-alumno',
    loadChildren: () => import('./pages/asignaturas-alumno/asignaturas-alumno.module').then( m => m.AsignaturasAlumnoPageModule)
  },
  {
    path: 'clases-profesor',
    loadChildren: () => import('./pages/clases-profesor/clases-profesor.module').then( m => m.ClasesProfesorPageModule)
  },
  {
    path: 'clases-alumno',
    loadChildren: () => import('./pages/clases-alumno/clases-alumno.module').then( m => m.ClasesAlumnoPageModule)
  },
  {
    path: 'asistencia-alumno',
    loadChildren: () => import('./pages/asistencia-alumno/asistencia-alumno.module').then( m => m.AsistenciaAlumnoPageModule)
  },
  {
    path: 'asistencias-profesor',
    loadChildren: () => import('./pages/asistencias-profesor/asistencias-profesor.module').then( m => m.AsistenciasProfesorPageModule)
  },
  {
    path: 'p404',
    loadChildren: () => import('./pages/p404/p404.module').then( m => m.P404PageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

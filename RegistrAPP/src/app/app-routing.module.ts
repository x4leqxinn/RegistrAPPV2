import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//Importamos al guardián
import { AuthenGuardService } from './services/authen-guard.service';

// LA PÁGINA DE LOGIN - MENU - INFORMACIÓN SON PÁGINAS DE TEST (SE DEBEN ELIMINAR LUEGO)

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
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'tabs-alumno',
    loadChildren: () => import('./pages/tabs-alumno/tabs-alumno.module').then( m => m.TabsAlumnoPageModule), canActivate:[AuthenGuardService]
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
    path: 'cambiar-contrasenia',
    loadChildren: () => import('./pages/cambiar-contrasenia/cambiar-contrasenia.module').then( m => m.CambiarContraseniaPageModule)
  },
  {
    path: 'cursos-profesor/:rut',
    loadChildren: () => import('./pages/cursos-profesor/cursos-profesor.module').then( m => m.CursosProfesorPageModule), canActivate:[AuthenGuardService]
  },
  {
    path: 'asignaturas-profesor/:rut/:cursoID',
    loadChildren: () => import('./pages/asignaturas-profesor/asignaturas-profesor.module').then( m => m.AsignaturasProfesorPageModule), canActivate:[AuthenGuardService]
  },
  {
    path: 'clases-profesor/:rut/:cursoID/:asignaturaID',
    loadChildren: () => import('./pages/clases-profesor/clases-profesor.module').then( m => m.ClasesProfesorPageModule), canActivate:[AuthenGuardService]
  },
  {
    path: 'asignaturas-alumno',
    loadChildren: () => import('./pages/asignaturas-alumno/asignaturas-alumno.module').then( m => m.AsignaturasAlumnoPageModule)
  },
  {
    path: 'clases-alumno',
    loadChildren: () => import('./pages/clases-alumno/clases-alumno.module').then( m => m.ClasesAlumnoPageModule)
  },
  {
    // Redirecciona todas las direcciones erronéas a esta página
    path: '**',
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

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
    path: 'recuperar-cuenta',
    loadChildren: () => import('./pages/recuperar-cuenta/recuperar-cuenta.module').then( m => m.RecuperarCuentaPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  { ///
    path: 'inicio/:username',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule), canActivate:[AuthenGuardService]
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
  },
  /*
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule), canActivate:[AuthenGuardService]
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  */
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

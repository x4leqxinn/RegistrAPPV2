import { Injectable } from '@angular/core';

/// Librerías
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

//
import { Observable } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  // Cabecera HTTP Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //va en formato JSON
      'Access-Control-Allow-Origin': '**'
    })
  }

  constructor(private http: HttpClient) { }
/*
    path('alumno/',AlumnoView.as_view(), name = "listaAlumnos"),
    path('asistencia/',AsistenciaView.as_view(), name = "listaAsistencias"),
    path('asistencia/<int:id>',AsistenciaView.as_view(), name = "procesoAsistencia"),
    path('login/',LoginView.as_view(), name = "Login"),
    path('guardar-asistencia/',GuardarAsistenciaView.as_view(), name = "guardarAsistencia"),
    path('codigoqr/',CodigoQRView.as_view(), name = "procesoCodigoQR"),
    path('listar-cursos-profesor/<int:rutProfesor>/',ListarCursoProfeView.as_view(), name = "listarCursosProfe"),
    path('listar-asignaturas-profesor/<int:rutProfesor>/<int:cursoID>',ListarAsignaturaProfeView.as_view(), name = "listarAsignaturasProfe"),
    path('listar-cursos-profesor/<int:rutProfesor>/<int:cursoID>/<int:asignaturaID>',ListarClaseProfeView.as_view(), name = "listarClasesProfe"),
    path('listar-asignaturas-alumno/<int:rutAlumno>/',ListarAsignaturaAlumnoView.as_view(), name = "listarAsignaturasAlumno"),
    path('listar-clases-alumno/<int:rutAlumno>/<int:asignaturaID>/',ListarClaseAlumnoView.as_view(), name = "listarClasesAlumno"),

*/ 
  // Definir direcciones HTTP
  //http://localhost:9100/
  //http://192.168.43.146:9100/
  direccionHost = "http://localhost:9100/";
  direccionGenerarQR = this.direccionHost + "codigoqr/"; // PUT
  direccionEscanearQR = this.direccionHost + "codigoqr/"; // POST
  direccionIniciarSesion = this.direccionHost + "login/"; // POST
  direccionCambiarContrasenia = this.direccionHost + "cambiar-contrasenia/"; // PUT
  direccionGuardarAsistencia = this.direccionHost + "guardar-asistencia/" // POST
  direccionRegistrarAsistencia = this.direccionHost + "asistencia/"; // POST
  direccionModificarAsistencia = this.direccionHost + "asistencia/"; // PUT
  direccionEliminarAsistencia = this.direccionHost + "asistencia/"; // DELETE + ID
  direccionBuscarAsistencia = this.direccionHost + "asistencia/"; // GET + ID
  direccionListarAsistencias = this.direccionHost + "asistencia/"; // GET
  direccionListarCursosDocente = this.direccionHost + "listar-cursos-profesor/"; // GET
  direccionListarAsignaturasDocente = this.direccionHost + "listar-asignaturas-profesor/";
  direccionListarClasesDocente= this.direccionHost + "listar-clases-profesor/"; // GET


  // FALTAN AGREGAR LOS DE LISTAR ASISTENCIA CON FILTROS PARA LAS VISTAS

  // Crear los métodos para acceder a cada uno de los métodos de la BDD

  //Método listar todas las asistencias del Colegio
  listarAsistenciaGET(): Observable<any> {
    return this.http.get(this.direccionListarAsistencias).pipe(retry(3));
  }

  //Método buscar asistencia por id
  buscarAsistenciaGET(id): Observable<any> {
    return this.http.get(this.direccionBuscarAsistencia + id).pipe(retry(3));
  }

  // Método para agregar una asistencia 
  agregarAsistenciaPOST(asistencia): Observable<any> {
    return this.http.post(this.direccionRegistrarAsistencia, asistencia, this.httpOptions).pipe(retry(3));
  }

  // Método para modificar una asistencia 
  modificarAsistenciaPUT(id, asistencia): Observable<any> {
    return this.http.put(this.direccionModificarAsistencia + id, asistencia, this.httpOptions).pipe(retry(2));
  }

  //Método para eliminar una asistencia por ID
  deletePost(id) {
    return this.http.delete(this.direccionEliminarAsistencia + id, this.httpOptions).pipe(retry(2));
  }

  // Método Iniciar Sesión 
  iniciarSesionPOST(usuario):Observable<any>{
    return this.http.post(this.direccionIniciarSesion, usuario, this.httpOptions).pipe(retry(3));
  }

  // Método para cambiar la contraseña del usuario
  cambiarContraseniaPUT(usuario):Observable<any>{
    return this.http.put(this.direccionIniciarSesion, usuario, this.httpOptions).pipe(retry(3));
  }

  // Método que recupera los cursos que el profesor imparte
  listarCursoGET(id):Observable<any>{
    return this.http.get(this.direccionListarCursosDocente + id).pipe(retry(3));
  }

  listarAsignaturaGET(rut,cursoID):Observable<any>{
    return this.http.get(this.direccionListarAsignaturasDocente + rut + '/' + cursoID).pipe(retry(3));
  }

  listarClaseDocenteGET(rut, cursoID, asignaturaID):Observable<any>{
    return this.http.get(this.direccionListarClasesDocente + rut + '/' + cursoID + '/' + asignaturaID).pipe(retry(3));
  }

  /*
  {
    "email" : "jorgealequinn@gmail.com",
    "nuevaContrasenia" : "admin123"
}
  */

}

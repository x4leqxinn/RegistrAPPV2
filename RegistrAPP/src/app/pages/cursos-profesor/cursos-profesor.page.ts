import { Component, OnInit } from '@angular/core';
import { CursoI } from 'src/app/components/model/curso.interface';

@Component({
  selector: 'app-cursos-profesor',
  templateUrl: './cursos-profesor.page.html',
  styleUrls: ['./cursos-profesor.page.scss'],
})
export class CursosProfesorPage implements OnInit {

  // Curso
  curso:CursoI;
  curso1:CursoI;

  //Arreglo de cursos
  cursos:CursoI[] = [];

  constructor() { }

  ngOnInit() {
    // LO CONSEGUÍ
    this.curso1 = {
      id:1,
      nombre:"u"
    }

    this.curso = {
      id:2,
      nombre:"uwu"
    }

    this.cursos.push(this.curso1)
    this.cursos.push(this.curso)
    console.log(this.cursos)
   
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs-alumno',
  templateUrl: './tabs-alumno.page.html',
  styleUrls: ['./tabs-alumno.page.scss'],
})
export class TabsAlumnoPage implements OnInit {
  // Variable de tab seleccionada
  selectTab: any;
  @ViewChild('tabs') tabs: IonTabs;

  constructor
  (
    private router: Router
  ) { }

  ngOnInit() {
  }

  setCurrentTab(event) {
    console.log(event);   
    this.selectTab = this.tabs.getSelected();
  }

}

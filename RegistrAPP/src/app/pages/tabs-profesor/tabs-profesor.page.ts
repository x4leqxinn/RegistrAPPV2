// Importamos ViewChild
import { Component, OnInit, ViewChild } from '@angular/core';
// Importamos IonTabs
import { IonTabs } from '@ionic/angular';
//
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs-profesor',
  templateUrl: './tabs-profesor.page.html',
  styleUrls: ['./tabs-profesor.page.scss'],
})
export class TabsProfesorPage implements OnInit {
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

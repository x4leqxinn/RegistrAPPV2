// Importamos ViewChild
import { Component, OnInit, ViewChild } from '@angular/core';
// Importamos IonTabs
import { IonTabs } from '@ionic/angular';
@Component({
  selector: 'app-tabs-profesor',
  templateUrl: './tabs-profesor.page.html',
  styleUrls: ['./tabs-profesor.page.scss'],
})
export class TabsProfesorPage implements OnInit {
  // Variable de tab seleccionada
  selectTab: any;
  @ViewChild('tabs') tabs: IonTabs;

  constructor(
  ) { }

  ngOnInit() {
  }

  setCurrentTab(event) {
    console.log(event);   
    this.selectTab = this.tabs.getSelected();
  }


}

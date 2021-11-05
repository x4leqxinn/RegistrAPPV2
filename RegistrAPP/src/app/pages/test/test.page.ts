import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  value_selected:string = '2';

  valueChanged(){
    alert(this.value_selected);
  }


  ngOnInit() {

  }
}

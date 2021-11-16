import { Component, OnInit } from '@angular/core';
import { TtsService } from 'src/app/services/tts.service';

@Component({
  selector: 'app-p404',
  templateUrl: './p404.page.html',
  styleUrls: ['./p404.page.scss'],
})
export class P404Page implements OnInit {

  constructor
  (
    private ttsService : TtsService
  )
  { }

  ngOnInit() {
    this.ttsService.aviso();
  }

}

import { Component } from '@angular/core';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private dataStorage: DataStorageService) {

  }

  buttonClicked() {
    //we're going to do some stuff here later...
  }

}

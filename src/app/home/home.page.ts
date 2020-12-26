import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

declare var iro: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient) {

  }

  sendRequest() {
    console.log("test")
  }

}

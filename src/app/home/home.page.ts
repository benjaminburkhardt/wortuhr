import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

declare var iro: any;

declare function sendRequest(): any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient) {

  }

  sendApiRequest() {
    sendRequest();
  }

}

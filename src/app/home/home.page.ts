import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import { LoadingController } from '@ionic/angular';

import { Constants } from "../Constants";


declare var iro: any;
declare function sendRequest(): any;
declare function getPickerParameters(): any;
declare function createColorPicker(): any;
declare function updatePickerWithRgb(red, blue, green, brightness): any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  private reconnectingAlert: Promise<HTMLIonLoadingElement>;
  private serverError:boolean;

  ngOnInit(): void {
    this.reconnectingAlert = this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Connecting...',
    });
  }

  constructor(private http: HttpClient, public loadingController: LoadingController) {}

  /**
   * Called right after UI is drawn
   */
  ngAfterContentInit() {
    this.serverError = false;
    createColorPicker();
    this.updatePickerWithCurrentRgb();

    setInterval(() => {
      this.checkWifiConnection()
    }, 1000);
  }


  // ===================================
  // Server Communication
  // ===================================

  /**
   * Send colors to ESP
   */
  updateRGB() {

    var pickerParameters = getPickerParameters();

    this.http.get(Constants.getServerAddr(), {
      params: pickerParameters,
      observe: 'response'
    })
        .toPromise()
        .then(response => {
          this.responseHandler(response, pickerParameters);
        })
        .catch(console.log);
  }

  /**
   * Handle Response for updating RGB
   * @param response
   * @param params
   */
  responseHandler(response: HttpResponse<any>, params){


    if(response.ok){
      // success
      console.log("Request successfully set.")
      var json = response.body

      // Check if response is correct
      if(json.rgb.r == params.r){
        console.log("RGB successfully set.")
      }
    }else{
      // fail
      console.log("Failed to set RGB. Server not available.")
    }
  }


  /**
   * Get preset colors from ESP
   */
  updatePickerWithCurrentRgb(){

    console.log("Updating picker with server values...")

    this.http.get(Constants.getServerAddr(), {
      observe: 'response'
    })
        .toPromise()
        .then(response => {
          if(response.ok) {
            var json = response.body
            updatePickerWithRgb(json["rgb"].r-100, json["rgb"].g-100, json["rgb"].b-100, json["rgb"].br-100)
          }
        })
        .catch(response => {
          console.log("Server not available...")
          // try again later
          setTimeout(() => {
            console.log("Trying again to load rgb from server...")
            this.updatePickerWithCurrentRgb()
          }, 1000);

        });
  }

  /**
   * Checks if connection is available and updates wifi icon
   */
  checkWifiConnection(){
    this.http.get(Constants.getServerAddr(), {
      observe: 'response'
    })
        .toPromise()
        .then(response => {
          if(response.ok) {
            var json = response.body
            this.updateWifiStatus(response.ok)
          }
        })
        .catch(response => {
          console.log("Server not available...")
          this.updateWifiStatus(response.ok)
          // try again later

        });
  }


  // ===================================
  // UI
  // ===================================

  updateWifiStatus(connected: boolean){

    if(connected){
      (document.querySelector('#wifi-status') as HTMLElement).style.color = "green"
      this.hideConnectingAlert()

    }else{
      (document.querySelector('#wifi-status') as HTMLElement).style.color = "red"
      this.presentConnectingAlert()

    }
  }

  /**
   * For showing ui elements in dev mode
   */
  isDev(){
    return Constants.DEV;
  }

  /**
   * Present Loading-Spinner in UI
   */

  async presentConnectingAlert() {
    this.serverError = true;
    (await this.reconnectingAlert).present();
  }

  async hideConnectingAlert() {
    (await this.reconnectingAlert).dismiss();

    if(this.serverError){
      this.serverError = false;
      this.updatePickerWithCurrentRgb();
    }

  }


}

import {Component, OnInit} from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AlertController, LoadingController} from '@ionic/angular';

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
  isApp:boolean;

  // Slider
  minValue: number = 6;
  maxValue: number = 24;
  options: Options = {
    floor: 0,
    ceil: 24,
    step: 1,
    showTicks: true
  };


  ngOnInit(): void {
    this.reconnectingAlert = this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Connecting...',
    });

    this.isApp = !document.URL.startsWith('http');
    if(this.isApp){
      Constants.DEV = false;
    }
  }

  constructor(private http: HttpClient, public loadingController: LoadingController, public alertController: AlertController) {}

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
        .catch(console.log)

  }

  updateWithQuickColor(r, g, b) {
    updatePickerWithRgb(r, g, b, 100);
    this.updateRGB();
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

    console.log("Checking WIFI connection...")



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

  // Settings

  /**
   * Set custom server address via settings card
   * @param address
   */
  onChangeServerUrl(address){
    Constants.setCustomServerAddr(address);
  }

  /**
   * Returns current server url for UI
   */
  getCurrentServerUrl(){
    return Constants.getServerAddr();
  }


  // ===================================
  // UI
  // ===================================

  updateWifiStatus(connected: boolean){

    if(connected){
      (document.querySelector('#wifi-status') as HTMLElement).style.color = "green";
      (document.querySelector('#wifi-status-text') as HTMLElement).innerHTML = "Verbunden &nbsp;";
      this.hideConnectingAlert()

    }else{
      (document.querySelector('#wifi-status') as HTMLElement).style.color = "red";
      (document.querySelector('#wifi-status-text') as HTMLElement).innerHTML = "Fehler &nbsp;";


      // Alert disabled for dev...
      // this.presentConnectingAlert()

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

  async presentAlert() {
    var msg = ""
    if(Constants.DEV){
      msg = "You are in DEV mode.<br>Address: "+Constants.getServerAddr();
    }else{
      msg = "You are in PROD mode.<br>Address: "+Constants.getServerAddr();
    }
    msg = msg + "<br> Change mode?"

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'DEV Server',
      message: 'Current server: '+Constants.getServerAddr()+"<br>"+"",
      buttons: [
        {
          text: 'DEV',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            Constants.DEV = true;
          }
        }, {
          text: 'PROD',
          handler: () => {
            Constants.DEV = false;
          }
        }
      ]
    });


    await alert.present();

    await alert.present();
  }




}
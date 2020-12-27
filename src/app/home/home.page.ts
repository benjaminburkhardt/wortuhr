import { Component } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import { LoadingController } from '@ionic/angular';



declare var iro: any;

declare function sendRequest(): any;
declare function getPickerParameters(): any;
declare function updatePickerWithCurrentRgb(red, blue, green, brightness): any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient, public loadingController: LoadingController) {}





  /**
   * Update colors on ESP
   */
  updateRGB() {

    var apiUrl = 'http://wortuhr/pixelgraphic'

    // Debugging
    if(true) {
      apiUrl = "http://localhost:8009"
    }
    var params = getPickerParameters();


    console.log("Params from picker: ");
    console.log(params);

    this.http.get(apiUrl, {
      params: params,
      observe: 'response'
    })
        .toPromise()
        .then(response => {
          this.responseReceived(response, params);
        })
        .catch(console.log);

  }


  updatePickerWithCurrentRgb(){

    var apiUrl = "http://localhost:8009"


    this.http.get(apiUrl, {
      observe: 'response'
    })
        .toPromise()
        .then(response => {
          var json = response.body;
          updatePickerWithCurrentRgb(json["rgb"].r, json["rgb"].g, json["rgb"].b, json["rgb"].br);
        })
        .catch(console.log);
  }


  /**
   * Handle Response
   * @param response
   * @param params
   */
  responseReceived(response: HttpResponse<any>, params){

    this.presentLoading()

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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Updating...',
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}

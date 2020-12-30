export abstract class Constants {
    static DEV: boolean = true
    private static readonly DEV_SERVER: string = "http://192.168.0.74:8009"
    private static readonly PROD_SERVER: string = "http://wortuhr/pixelgraphic"

    /**
     * Returns server address
      */
    static getServerAddr(){
        if(Constants.DEV){
            return Constants.DEV_SERVER
        }else{
            return Constants.PROD_SERVER
        }
    }
}
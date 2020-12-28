export abstract class Constants {
    static readonly DEV: boolean = true
    static readonly DEV_SERVER: string = "http://localhost:8009"
    static readonly PROD_SERVER: string = "http://wortuhr/pixelgraphic"

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
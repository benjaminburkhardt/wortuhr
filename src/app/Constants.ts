export abstract class Constants {
    static DEV: boolean = true
    static CUSTOM_SERVER_SET = false
    private static readonly DEV_SERVER: string = "http://localhost:8009"
    private static readonly PROD_SERVER: string = "http://wortuhr/pixelgraphic"
    private static CUSTOM_SERVER: string = ""

    /**
     * Returns server address
      */
    static getServerAddr(){

        if(this.CUSTOM_SERVER_SET){
            return this.CUSTOM_SERVER;
        }else
        {
            if (this.DEV) {
                return this.DEV_SERVER
            } else {
                return this.PROD_SERVER
            }
        }
    }

    static setCustomServerAddr(address){
        this.CUSTOM_SERVER = address
        this.CUSTOM_SERVER_SET = true;
    }
}
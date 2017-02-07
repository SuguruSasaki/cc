import { namespace_global } from '../namespace';


export class EnterFrameBeacon {

    constructor(){
        throw new Error("EnterFrameBeacon can't create instance!!");
    }

    /**
     * initialize
     */
    static init(){
        EnterFrameBeacon.isInitialize = true;
    }

    /**
     *
     * @param listener
     */
    static addListener(listener){
        EnterFrameBeacon.__checkInitialize__();
        EnterFrameBeacon.listeners.push(listener);
    }

    static start() {
        EnterFrameBeacon.__checkInitialize__();
        requestAnimationFrame(EnterFrameBeacon.__update__);
    }


    static stop() {
        EnterFrameBeacon.__checkInitialize__();
        cancelAnimationFrame(EnterFrameBeacon.__update__);
    }


    static __update__(){
        var len = EnterFrameBeacon.listeners.length;
        for(var i = 0; i < len; ++i){
            EnterFrameBeacon.listeners[i]();
        }
        requestAnimationFrame(EnterFrameBeacon.__update__);
    }


    static __checkInitialize__(){
        if(!EnterFrameBeacon.isInitialize) throw new Error("EnterFrameBeaconb is not initialized.");
    }

}

//-----------------------------------------
// CLASS PROPERTY
//-----------------------------------------

EnterFrameBeacon.isInitialize = false;
EnterFrameBeacon.listeners = [];

namespace_global("EnterFrameBeacon", EnterFrameBeacon);
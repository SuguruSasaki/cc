import { namespace } from '../namespace.es6';
import { Delegate  } from '../utils/Delegate.es6';
import { EventDispatcher } from '../events/EventDispatcher.es6';
import { Event } from '../events/Event.es6';
import { IOErrorEvent } from '../events/IOErrorEvent.es6';

export class Loader {

    constructor(){
        this.xhr = new XMLHttpRequest();
        this.eventDispatcher = new EventDispatcher();
        this.data = null;
        this.__setup__();
    }


    dispose(){
        this.xhr = null;
        this.eventDispatcher.dispose();
        this.eventDispatcher = null;
        this.data = null;
    }


    load(path){
        this.xhr.open('GET', path, true);
        this.xhr.send(null);
    }


    addEventListener(type, listener){
        this.eventDispatcher.addEventListener(type, listener);
    }


    __setup__(){
        this.xhr.onreadystatechange = Delegate.create(this, this.__onReadyStateChange__);
    }


    __onReadyStateChange__(){
        var xhr = this.xhr;
        switch (xhr.readyState) {
            case 0:
                console.log("uninitialize!");
                break;

            case 1:
                console.log("Loading");
                break;

            case 2:
                console.log("Loading");
                break;

            case 3:
                console.log("interactive");
                break;

            case 4:
                if(xhr.status == 200 || xhr.status == 304) {
                    this.data = xhr.responseText;
                    console.log(this.data);
                    this.eventDispatcher.broadcast(Event.COMPLETE);

                }else if(xhr.status == 404){
                    this.eventDispatcher.broadcast(IOErrorEvent.IO_ERROR, xhr.statusText);
                }else{
                    console.log( 'Failed. HttpStatus: ' + xhr.statusText );
                }
                break;

            default:
                break;
        }
    }

}

namespace("Loader", Loader);
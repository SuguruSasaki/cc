import { namespace } from '../namespace.es6';


export class EventDispatcher {

    /**
     * Constractor
     */
    constructor(){
        this.listeners = [];
    }


    /**
     * Dispose
     */
    dispose(){

    }


    /**
     * Add event listener
     * @param type
     * @param listener
     */
    addEventListener(type, listener){
        if(this.listeners[type] == null) this.listeners[type] = [];
        this.listeners[type]["push"](listener);
    }

    /**
     * Remove event listener
     * @param type
     * @param listener
     */
    removeEventListner(type, listener){
        if(!this.listeners[type]) throw new Error("存在しないリスナーにアクセスしています。");
        var self = this;
        this.listeners[type].some(function(v, i){
            if(v == listener) self.listeners.splice(i, 1);
        });
    }

    /**
     * broadcast event
     * @param event
     */
    broadcast(event){
        var observers = this.listeners[event.type];
        for(var i = 0; i < observers.length; ++i){
            observers[i](event);
        }
    }


}

namespace("EventDispatcher", EventDispatcher);

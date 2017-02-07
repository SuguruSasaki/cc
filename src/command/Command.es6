import { namespace } from '../namespace.es6';
import { EventDispatcher } from '../events/EventDispatcher.es6';
import { Event } from '../events/Event.es6';

export class Command {

    constructor(scope, method){
        this.scope  = scope;
        this.method = method;
        this.args  = Array.prototype.slice.apply(arguments).slice(2);

        this.eventDispatcher = new EventDispatcher();
    }

    /**
     * execute
     */
    execute(){
        if(this.method == null) throw new Error("メソッドが設定されていません。");
        if(this.args == null){
            this.method.apply(this.scope);
        }else{
            this.method.apply(this.scope, this.args);
        }
        this.eventDispatcher.broadcast(new Event(Event.COMPLETE));
    }

    /**
     * Add event listener
     * @param type
     * @param listener
     */
    addEventListener(type, listener){
        this.eventDispatcher.addEventListener(type, listener);
    }


}

namespace("Command", Command);

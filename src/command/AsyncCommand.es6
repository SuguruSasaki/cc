import { namespace } from '../namespace.es6';
import { Delegate } from '../utils/Delegate.es6';
import { Command } from './Command.es6';


export class AsyncCommand extends Command {

    constructor(scope, method){
        super(scope, method);
        this.args  = Array.prototype.slice.apply(arguments).slice(2);
    }


    execute(){
        if(this.method == null ) throw new Error("メソッドが設定されていません。");
        this.scope.addEventListener(Event.COMPLETE, Delegate.create(this, this.__onCompleteListener__));
        if(this.args == null){
            this.method.apply(this.scope);
        }else{
            this.method.apply(this.scope, this.args);
        }
    }


    addEventListener(type, listener){
        this.eventDispatcher.addEventListener(type, listener);
    }


    __onCompleteListener__(){
        this.eventDispatcher.broadcast(new Event(Event.COMPLETE));
    }
}

namespace("AsyncCommand", AsyncCommand);
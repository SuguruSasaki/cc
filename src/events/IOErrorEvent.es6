import { namespace } from '../namespace.es6';

export class IOErrorEvent extends Event {

    constructor(type, text){
        super(type);
        this.text = text;
    }
}

IOErrorEvent.IO_ERROR = Symbol();

namespace("IOErrorEvent", IOErrorEvent);
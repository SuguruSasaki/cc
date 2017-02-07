import { namespace } from '../namespace.es6';


export class Event {

    constructor(type){
        this.type = type;
    }
}

Event.COMPLETE = Symbol();

namespace("Event", Event);


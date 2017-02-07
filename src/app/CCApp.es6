import  { namespace } from '../namespace.es6';

export class CCApp {

    constructor(){
        console.log("CCApp");
    }

}

namespace("CCApp", CCApp);
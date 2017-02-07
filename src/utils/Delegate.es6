import { namespace_global } from '../namespace.es6';

export class Delegate {

    static create(scope, method){
        var obj = function(){
            return method.apply(scope, arguments);
        };
        return obj;
    }
}

namespace_global("Delegate", Delegate);



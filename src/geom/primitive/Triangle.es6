import { namespace } from '../../namespace';


export class Triangle {

    constructor(){
        this.vertices = new Float32Array([
            0.0,  0.5,
            -0.5, -0.5,
            0.5, -0.5
        ]);
    }

}

namespace("Triangle", Triangle);
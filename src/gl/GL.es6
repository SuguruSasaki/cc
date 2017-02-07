import { namespace } from '../namespace';

export class GL {

    /**
     * Constractor
     * @param context
     */
    constructor(context){
        this.gl = context
    }

    /**
     *
     * @param r
     * @param g
     * @param b
     * @param a
     */
    setClearColor(r, g, b, a=1.0){
        this.gl.clearColor(r, g, b, a);
    }

    /**
     *
     */
    clearStage(){
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}

namespace("GL", GL);
import { namespace } from '../../namespace.es6';


export class ProgramBuilder {

    /**
     * Constractor
     * @param context
     */
    constructor(context){
        this.gl = context;
    }

    /**
     * Create Program
     * @param vs
     * @param fs
     * @returns {*}
     */
    build(vs, fs){
        var program = this.gl.createProgram();
        this.gl.attachShader(program, vs);
        this.gl.attachShader(program, fs);
        this.gl.linkProgram(program);

        if(this.gl.getProgramParameter(program, this.gl.LINK_STATUS)){
            this.gl.useProgram(program);
            return program;
        }
        throw new Error(this.gl.getProgramInfoLog(program));
    }

}

namespace("ProgramBuilder", ProgramBuilder);
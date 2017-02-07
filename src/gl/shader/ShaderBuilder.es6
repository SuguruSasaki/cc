import { namespace } from '../../namespace.es6';

export class ShaderBuilder {

    /**
     * Constractor
     * @param context
     */
    constructor(context){
        this.gl = context;
    }

    /**
     * Create Vertex Shader
     * @param source
     * @returns {*}
     */
    buildVertexShader(source){
        return this.__build__(this.gl.VERTEX_SHADER, source);
    }

    /**
     * Create Fragment Shader
     * @param source
     * @returns {*}
     */
    buildFragmentShader(source){
        return this.__build__(this.gl.FRAGMENT_SHADER, source);
    }


    /**
     * Create Shader instance
     * @param type
     * @param source
     * @returns {*}
     * @private
     */
    __build__(type, source){
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if(this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)){
            return shader;
        }
        throw new Error("Shaderのコンパイルに失敗しました。");
    }

}

namespace("ShaderBuilder", ShaderBuilder);
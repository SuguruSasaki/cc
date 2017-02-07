import { namespace }      from '../namespace.es6';
import { GL }             from '../gl/GL.es6';
import { ShaderBuilder }  from '../gl/shader/ShaderBuilder.es6';
import { ProgramBuilder } from '../gl/shader/ProgramBuilder.es6';
import { BufferBuilder }  from '../gl/shader/BufferBuilder.es6';

export class C2App {

    /**
     * Constractor
     * @param stageID HTML上のcanvasのID
     */
    constructor(stageID){
        this.stage = document.getElementById(stageID);

        this.vertexShader   = null;
        this.fragmentShader = null;
        this.program        = null;


    }


    init(){
        this.gl    = new GL(this.getContext());

    }

    /**
     * Set fullscreen
     */
    enableFullScreen(){
        this.stage.width  = window.innerWidth;
        this.stage.height = window.innerHeight;
    }



    /**
     * Context取得
     * @returns {*|CanvasRenderingContext2D}
     */
    getContext(){
        return this.stage.getContext("webgl") || this.stage.getContext("experimental-webgl");
    }


    addVertexShader(source){
        var shaderBuilder = new ShaderBuilder(this.gl.gl);
        this.vertexShader = shaderBuilder.buildVertexShader(source);
    }

    addFragmentShader(source){
        var shaderBuilder = new ShaderBuilder(this.gl.gl);
        this.fragmentShader = shaderBuilder.buildFragmentShader(source);
    }


    createProgram(){
        var programBuilder = new ProgramBuilder(this.gl.gl);
        this.program = programBuilder.build(this.vertexShader, this.fragmentShader);
    }

    createBuffer(vertices){
        var bufferBuilder = new BufferBuilder(this.gl.gl);
        bufferBuilder.build(vertices);
    }
}

namespace("C2App", C2App);
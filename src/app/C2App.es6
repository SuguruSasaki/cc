import  { namespace } from '../namespace.es6';
import  { GL } from '../gl/GL.es6';
import  { AsyncCommand } from '../command/AsyncCommand.es6';

export class C2App {

    /**
     * Constractor
     * @param stageID HTML上のcanvasのID
     */
    constructor(stageID){
        this.stage = document.getElementById(stageID);
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


}

namespace("C2App", C2App);
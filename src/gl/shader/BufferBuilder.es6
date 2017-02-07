import { namespace } from '../../namespace.es6';


export class BufferBuilder {

    /**
     * Constractor
     * @param context
     */
    constructor(context){
        this.gl = context;
    }


    build(vertices){
        var vertexBuffer = this.gl.createBuffer();
        if(!vertexBuffer) {
            throw new Error("バッファオブジェクトの生成に失敗");
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    }

}

namespace("BufferBuilder", BufferBuilder);
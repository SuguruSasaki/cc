(function(global){

    var vsLoader = new CC.Loader();
    var fsLoader = new CC.Loader();


    var modelMatrix = new Matrix4();
    var ANGLE = 2;
    var tx = 0.0;

    modelMatrix.setTranslate(tx, 0, 0);
    modelMatrix.rotate(ANGLE, 0, 0, 1);

    // アニメーション
    EnterFrameBeacon.init();


    var process = new CC.ProcessCommand(this, main);
    process.addCommand(new CC.AsyncCommand(vsLoader, vsLoader.load, "assets/shader/shader.vert"));
    process.addCommand(new CC.AsyncCommand(fsLoader, fsLoader.load, "assets/shader/shader.frag"));
    process.execute();




    /**
     *
     */
    function main(){
        process.dispose();
        process = null;

        var triangle = new CC.Triangle();

        var app = C2.createApp("canvas");
        app.enableFullScreen();
        app.init();
        app.gl.setClearColor(0.0, 0.0, 0.0);
        app.gl.clear();

        app.addVertexShader(vsLoader.data);
        app.addFragmentShader(fsLoader.data);
        app.createProgram();
        app.createBuffer(triangle.vertices);

        var gl = app.gl.gl;

        var a_Position = gl.getAttribLocation(app.program, 'a_Position');
        if(a_Position < 0){
            throw new Error("a_Positionの格納場所の取得に失敗");
        }
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

        var u_ModelMatrix = gl.getUniformLocation(app.program, 'u_ModelMatrix');
        gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);


        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.enableVertexAttribArray(a_Position);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        //gl.disableVertexAttribArray(a_Position);


        var run = function(){

            modelMatrix.rotate(ANGLE, 0, 0, 1);

            app.gl.clear();
            gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

            gl.drawArrays(gl.LINE_LOOP, 0, 3);

            requestAnimationFrame(run);
        };

        run();

    }





})(window);
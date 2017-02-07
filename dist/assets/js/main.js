(function(global){

    var vsLoader = new CC.Loader();
    var fsLoader = new CC.Loader();


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

        var app = C2.createApp("canvas");
        app.enableFullScreen();
        app.gl.setClearColor(0.0, 0.0, 0.0);
        app.gl.clearStage();


    }


})(window);
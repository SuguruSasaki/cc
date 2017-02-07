(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.C2App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('../namespace.es6');

var _GL = require('../gl/GL.es6');

var _ShaderBuilder = require('../gl/shader/ShaderBuilder.es6');

var _ProgramBuilder = require('../gl/shader/ProgramBuilder.es6');

var _BufferBuilder = require('../gl/shader/BufferBuilder.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var C2App = exports.C2App = function () {

    /**
     * Constractor
     * @param stageID HTML上のcanvasのID
     */
    function C2App(stageID) {
        _classCallCheck(this, C2App);

        this.stage = document.getElementById(stageID);

        this.vertexShader = null;
        this.fragmentShader = null;
        this.program = null;
    }

    _createClass(C2App, [{
        key: 'init',
        value: function init() {
            this.gl = new _GL.GL(this.getContext());
        }

        /**
         * Set fullscreen
         */

    }, {
        key: 'enableFullScreen',
        value: function enableFullScreen() {
            this.stage.width = window.innerWidth;
            this.stage.height = window.innerHeight;
        }

        /**
         * Context取得
         * @returns {*|CanvasRenderingContext2D}
         */

    }, {
        key: 'getContext',
        value: function getContext() {
            return this.stage.getContext("webgl") || this.stage.getContext("experimental-webgl");
        }
    }, {
        key: 'addVertexShader',
        value: function addVertexShader(source) {
            var shaderBuilder = new _ShaderBuilder.ShaderBuilder(this.gl.gl);
            this.vertexShader = shaderBuilder.buildVertexShader(source);
        }
    }, {
        key: 'addFragmentShader',
        value: function addFragmentShader(source) {
            var shaderBuilder = new _ShaderBuilder.ShaderBuilder(this.gl.gl);
            this.fragmentShader = shaderBuilder.buildFragmentShader(source);
        }
    }, {
        key: 'createProgram',
        value: function createProgram() {
            var programBuilder = new _ProgramBuilder.ProgramBuilder(this.gl.gl);
            this.program = programBuilder.build(this.vertexShader, this.fragmentShader);
        }
    }, {
        key: 'createBuffer',
        value: function createBuffer(vertices) {
            var bufferBuilder = new _BufferBuilder.BufferBuilder(this.gl.gl);
            bufferBuilder.build(vertices);
        }
    }]);

    return C2App;
}();

(0, _namespace.namespace)("C2App", C2App);

},{"../gl/GL.es6":10,"../gl/shader/BufferBuilder.es6":11,"../gl/shader/ProgramBuilder.es6":12,"../gl/shader/ShaderBuilder.es6":13,"../namespace.es6":14}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.C2 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('./namespace.es6');

var _EnterFrameBeacon = require('./utils/EnterFrameBeacon.es6');

var _C2App = require('./app/C2App.es6');

var _Command = require('./command/Command.es6');

var _AsyncCommand = require('./command/AsyncCommand.es6');

var _ProcessCommand = require('./command/ProcessCommand.es6');

var _Loader = require('./net/Loader.es6');

var _Triangle = require('./geom/primitive/Triangle');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var C2 = exports.C2 = function () {
    function C2() {
        _classCallCheck(this, C2);
    }

    _createClass(C2, null, [{
        key: 'createApp',


        /**
         * Create C2App instance
         * @param stageID
         * @returns {C2App|*}
         */
        value: function createApp(stageID) {
            return new CC.C2App(stageID);
        }
    }]);

    return C2;
}();

(0, _namespace.namespace_global)("C2", C2);

},{"./app/C2App.es6":1,"./command/AsyncCommand.es6":3,"./command/Command.es6":4,"./command/ProcessCommand.es6":5,"./geom/primitive/Triangle":9,"./namespace.es6":14,"./net/Loader.es6":15,"./utils/EnterFrameBeacon.es6":17}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AsyncCommand = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('../namespace.es6');

var _Delegate = require('../utils/Delegate.es6');

var _Command2 = require('./Command.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncCommand = exports.AsyncCommand = function (_Command) {
    _inherits(AsyncCommand, _Command);

    function AsyncCommand(scope, method) {
        _classCallCheck(this, AsyncCommand);

        var _this = _possibleConstructorReturn(this, (AsyncCommand.__proto__ || Object.getPrototypeOf(AsyncCommand)).call(this, scope, method));

        _this.args = Array.prototype.slice.apply(arguments).slice(2);
        return _this;
    }

    _createClass(AsyncCommand, [{
        key: 'execute',
        value: function execute() {
            if (this.method == null) throw new Error("メソッドが設定されていません。");
            this.scope.addEventListener(Event.COMPLETE, _Delegate.Delegate.create(this, this.__onCompleteListener__));
            if (this.args == null) {
                this.method.apply(this.scope);
            } else {
                this.method.apply(this.scope, this.args);
            }
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
            this.eventDispatcher.addEventListener(type, listener);
        }
    }, {
        key: '__onCompleteListener__',
        value: function __onCompleteListener__() {
            this.eventDispatcher.broadcast(new Event(Event.COMPLETE));
        }
    }]);

    return AsyncCommand;
}(_Command2.Command);

(0, _namespace.namespace)("AsyncCommand", AsyncCommand);

},{"../namespace.es6":14,"../utils/Delegate.es6":16,"./Command.es6":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Command = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('../namespace.es6');

var _EventDispatcher = require('../events/EventDispatcher.es6');

var _Event = require('../events/Event.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = exports.Command = function () {
    function Command(scope, method) {
        _classCallCheck(this, Command);

        this.scope = scope;
        this.method = method;
        this.args = Array.prototype.slice.apply(arguments).slice(2);

        this.eventDispatcher = new _EventDispatcher.EventDispatcher();
    }

    /**
     * execute
     */


    _createClass(Command, [{
        key: 'execute',
        value: function execute() {
            if (this.method == null) throw new Error("メソッドが設定されていません。");
            if (this.args == null) {
                this.method.apply(this.scope);
            } else {
                this.method.apply(this.scope, this.args);
            }
            this.eventDispatcher.broadcast(new _Event.Event(_Event.Event.COMPLETE));
        }

        /**
         * Add event listener
         * @param type
         * @param listener
         */

    }, {
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
            this.eventDispatcher.addEventListener(type, listener);
        }
    }]);

    return Command;
}();

(0, _namespace.namespace)("Command", Command);

},{"../events/Event.es6":6,"../events/EventDispatcher.es6":7,"../namespace.es6":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProcessCommand = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('../namespace.es6');

var _Delegate = require('../utils/Delegate.es6');

var _Command2 = require('./Command.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProcessCommand = exports.ProcessCommand = function (_Command) {
    _inherits(ProcessCommand, _Command);

    function ProcessCommand(scope, method) {
        _classCallCheck(this, ProcessCommand);

        var _this = _possibleConstructorReturn(this, (ProcessCommand.__proto__ || Object.getPrototypeOf(ProcessCommand)).call(this, scope, method));

        _this.commands = [];
        return _this;
    }

    _createClass(ProcessCommand, [{
        key: 'dispose',
        value: function dispose() {
            this.commands = null;
        }
    }, {
        key: 'execute',
        value: function execute() {
            if (this.commands.length == 0) throw new Error("Commandが登録されていません。");
            var command = this.commands.shift();
            command.addEventListener(Event.COMPLETE, _Delegate.Delegate.create(this, this.__onCompleteListener__));
            command.execute();
        }
    }, {
        key: 'addCommand',
        value: function addCommand(command) {
            this.commands.push(command);
        }
    }, {
        key: '__onCompleteListener__',
        value: function __onCompleteListener__() {
            if (this.commands.length > 0) {
                this.execute();
            } else {
                this.method.apply(this.scope);
            }
        }
    }]);

    return ProcessCommand;
}(_Command2.Command);

(0, _namespace.namespace)("ProcessCommand", ProcessCommand);

},{"../namespace.es6":14,"../utils/Delegate.es6":16,"./Command.es6":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Event = undefined;

var _namespace = require("../namespace.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = exports.Event = function Event(type) {
    _classCallCheck(this, Event);

    this.type = type;
};

Event.COMPLETE = Symbol();

(0, _namespace.namespace)("Event", Event);

},{"../namespace.es6":14}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventDispatcher = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require("../namespace.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventDispatcher = exports.EventDispatcher = function () {

    /**
     * Constractor
     */
    function EventDispatcher() {
        _classCallCheck(this, EventDispatcher);

        this.listeners = [];
    }

    /**
     * Dispose
     */


    _createClass(EventDispatcher, [{
        key: "dispose",
        value: function dispose() {
            this.listeners = null;
        }

        /**
         * Add event listener
         * @param type
         * @param listener
         */

    }, {
        key: "addEventListener",
        value: function addEventListener(type, listener) {
            if (this.listeners[type] == null) this.listeners[type] = [];
            this.listeners[type]["push"](listener);
        }

        /**
         * Remove event listener
         * @param type
         * @param listener
         */

    }, {
        key: "removeEventListner",
        value: function removeEventListner(type, listener) {
            if (!this.listeners[type]) throw new Error("存在しないリスナーにアクセスしています。");
            var self = this;
            this.listeners[type].some(function (v, i) {
                if (v == listener) self.listeners.splice(i, 1);
            });
        }

        /**
         * broadcast event
         * @param event
         */

    }, {
        key: "broadcast",
        value: function broadcast(event) {
            if (this.listeners[event.type] == null) return;
            var observers = this.listeners[event.type];
            for (var i = 0; i < observers.length; ++i) {
                observers[i](event);
            }
        }
    }]);

    return EventDispatcher;
}();

(0, _namespace.namespace)("EventDispatcher_global", EventDispatcher);

},{"../namespace.es6":14}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IOErrorEvent = undefined;

var _namespace = require("../namespace.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IOErrorEvent = exports.IOErrorEvent = function (_Event) {
    _inherits(IOErrorEvent, _Event);

    function IOErrorEvent(type, text) {
        _classCallCheck(this, IOErrorEvent);

        var _this = _possibleConstructorReturn(this, (IOErrorEvent.__proto__ || Object.getPrototypeOf(IOErrorEvent)).call(this, type));

        _this.text = text;
        return _this;
    }

    return IOErrorEvent;
}(Event);

IOErrorEvent.IO_ERROR = Symbol();

(0, _namespace.namespace)("IOErrorEvent", IOErrorEvent);

},{"../namespace.es6":14}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Triangle = undefined;

var _namespace = require("../../namespace");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triangle = exports.Triangle = function Triangle() {
    _classCallCheck(this, Triangle);

    this.vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
};

(0, _namespace.namespace)("Triangle", Triangle);

},{"../../namespace":14}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GL = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require("../namespace");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GL = exports.GL = function () {

    /**
     * Constractor
     * @param context
     */
    function GL(context) {
        _classCallCheck(this, GL);

        this.gl = context;
    }

    /**
     *
     * @param r
     * @param g
     * @param b
     * @param a
     */


    _createClass(GL, [{
        key: "setClearColor",
        value: function setClearColor(r, g, b) {
            var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;

            this.gl.clearColor(r, g, b, a);
        }

        /**
         *
         */

    }, {
        key: "clear",
        value: function clear() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }
    }, {
        key: "createShader",
        value: function createShader(type) {
            return this.gl.createShader(type);
        }
    }]);

    return GL;
}();

(0, _namespace.namespace)("GL", GL);

},{"../namespace":14}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BufferBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require("../../namespace.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BufferBuilder = exports.BufferBuilder = function () {

    /**
     * Constractor
     * @param context
     */
    function BufferBuilder(context) {
        _classCallCheck(this, BufferBuilder);

        this.gl = context;
    }

    _createClass(BufferBuilder, [{
        key: "build",
        value: function build(vertices) {
            var vertexBuffer = this.gl.createBuffer();
            if (!vertexBuffer) {
                throw new Error("バッファオブジェクトの生成に失敗");
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        }
    }]);

    return BufferBuilder;
}();

(0, _namespace.namespace)("BufferBuilder", BufferBuilder);

},{"../../namespace.es6":14}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProgramBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require("../../namespace.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgramBuilder = exports.ProgramBuilder = function () {

    /**
     * Constractor
     * @param context
     */
    function ProgramBuilder(context) {
        _classCallCheck(this, ProgramBuilder);

        this.gl = context;
    }

    /**
     * Create Program
     * @param vs
     * @param fs
     * @returns {*}
     */


    _createClass(ProgramBuilder, [{
        key: "build",
        value: function build(vs, fs) {
            var program = this.gl.createProgram();
            this.gl.attachShader(program, vs);
            this.gl.attachShader(program, fs);
            this.gl.linkProgram(program);

            if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
                this.gl.useProgram(program);
                return program;
            }
            throw new Error(this.gl.getProgramInfoLog(program));
        }
    }]);

    return ProgramBuilder;
}();

(0, _namespace.namespace)("ProgramBuilder", ProgramBuilder);

},{"../../namespace.es6":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShaderBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require("../../namespace.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShaderBuilder = exports.ShaderBuilder = function () {

    /**
     * Constractor
     * @param context
     */
    function ShaderBuilder(context) {
        _classCallCheck(this, ShaderBuilder);

        this.gl = context;
    }

    /**
     * Create Vertex Shader
     * @param source
     * @returns {*}
     */


    _createClass(ShaderBuilder, [{
        key: "buildVertexShader",
        value: function buildVertexShader(source) {
            return this.__build__(this.gl.VERTEX_SHADER, source);
        }

        /**
         * Create Fragment Shader
         * @param source
         * @returns {*}
         */

    }, {
        key: "buildFragmentShader",
        value: function buildFragmentShader(source) {
            return this.__build__(this.gl.FRAGMENT_SHADER, source);
        }

        /**
         * Create Shader instance
         * @param type
         * @param source
         * @returns {*}
         * @private
         */

    }, {
        key: "__build__",
        value: function __build__(type, source) {
            var shader = this.gl.createShader(type);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                return shader;
            }
            throw new Error("Shaderのコンパイルに失敗しました。");
        }
    }]);

    return ShaderBuilder;
}();

(0, _namespace.namespace)("ShaderBuilder", ShaderBuilder);

},{"../../namespace.es6":14}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * setting namespace
 */
var global = ('global', eval)('this');
var moduleName = "CC";
var namespace = exports.namespace = function namespace(className, myClass) {
  global[moduleName] = global[moduleName] ? global[moduleName] : {};
  global[moduleName][className] = myClass;
};

/**
 * setting global class
 * @param className
 * @param myClass
 */
var namespace_global = exports.namespace_global = function namespace_global(className, myClass) {
  global[className] = myClass;
};

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Loader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('../namespace.es6');

var _Delegate = require('../utils/Delegate.es6');

var _EventDispatcher = require('../events/EventDispatcher.es6');

var _Event = require('../events/Event.es6');

var _IOErrorEvent = require('../events/IOErrorEvent.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = exports.Loader = function () {
    function Loader() {
        _classCallCheck(this, Loader);

        this.xhr = new XMLHttpRequest();
        this.eventDispatcher = new _EventDispatcher.EventDispatcher();
        this.data = null;
        this.__setup__();
    }

    _createClass(Loader, [{
        key: 'dispose',
        value: function dispose() {
            this.xhr = null;
            this.eventDispatcher.dispose();
            this.eventDispatcher = null;
            this.data = null;
        }
    }, {
        key: 'load',
        value: function load(path) {
            this.xhr.open('GET', path, true);
            this.xhr.send(null);
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(type, listener) {
            this.eventDispatcher.addEventListener(type, listener);
        }
    }, {
        key: '__setup__',
        value: function __setup__() {
            this.xhr.onreadystatechange = _Delegate.Delegate.create(this, this.__onReadyStateChange__);
        }
    }, {
        key: '__onReadyStateChange__',
        value: function __onReadyStateChange__() {
            var xhr = this.xhr;
            switch (xhr.readyState) {
                case 0:
                    console.log("uninitialize!");
                    break;

                case 1:
                    console.log("Loading");
                    break;

                case 2:
                    console.log("Loading");
                    break;

                case 3:
                    console.log("interactive");
                    break;

                case 4:
                    if (xhr.status == 200 || xhr.status == 304) {
                        this.data = xhr.responseText;
                        console.log(this.data);
                        this.eventDispatcher.broadcast(_Event.Event.COMPLETE);
                    } else if (xhr.status == 404) {
                        this.eventDispatcher.broadcast(_IOErrorEvent.IOErrorEvent.IO_ERROR, xhr.statusText);
                    } else {
                        console.log('Failed. HttpStatus: ' + xhr.statusText);
                    }
                    break;

                default:
                    break;
            }
        }
    }]);

    return Loader;
}();

(0, _namespace.namespace)("Loader", Loader);

},{"../events/Event.es6":6,"../events/EventDispatcher.es6":7,"../events/IOErrorEvent.es6":8,"../namespace.es6":14,"../utils/Delegate.es6":16}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Delegate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require("../namespace.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Delegate = exports.Delegate = function () {
    function Delegate() {
        _classCallCheck(this, Delegate);
    }

    _createClass(Delegate, null, [{
        key: "create",
        value: function create(scope, method) {
            var obj = function obj() {
                return method.apply(scope, arguments);
            };
            return obj;
        }
    }]);

    return Delegate;
}();

(0, _namespace.namespace_global)("Delegate", Delegate);

},{"../namespace.es6":14}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EnterFrameBeacon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require("../namespace");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EnterFrameBeacon = exports.EnterFrameBeacon = function () {
    function EnterFrameBeacon() {
        _classCallCheck(this, EnterFrameBeacon);

        throw new Error("EnterFrameBeacon can't create instance!!");
    }

    /**
     * initialize
     */


    _createClass(EnterFrameBeacon, null, [{
        key: "init",
        value: function init() {
            EnterFrameBeacon.isInitialize = true;
        }

        /**
         *
         * @param listener
         */

    }, {
        key: "addListener",
        value: function addListener(listener) {
            EnterFrameBeacon.__checkInitialize__();
            EnterFrameBeacon.listeners.push(listener);
        }
    }, {
        key: "start",
        value: function start() {
            EnterFrameBeacon.__checkInitialize__();
            requestAnimationFrame(EnterFrameBeacon.__update__);
        }
    }, {
        key: "stop",
        value: function stop() {
            EnterFrameBeacon.__checkInitialize__();
            cancelAnimationFrame(EnterFrameBeacon.__update__);
        }
    }, {
        key: "__update__",
        value: function __update__() {
            var len = EnterFrameBeacon.listeners.length;
            for (var i = 0; i < len; ++i) {
                EnterFrameBeacon.listeners[i]();
            }
            requestAnimationFrame(EnterFrameBeacon.__update__);
        }
    }, {
        key: "__checkInitialize__",
        value: function __checkInitialize__() {
            if (!EnterFrameBeacon.isInitialize) throw new Error("EnterFrameBeaconb is not initialized.");
        }
    }]);

    return EnterFrameBeacon;
}();

//-----------------------------------------
// CLASS PROPERTY
//-----------------------------------------

EnterFrameBeacon.isInitialize = false;
EnterFrameBeacon.listeners = [];

(0, _namespace.namespace_global)("EnterFrameBeacon", EnterFrameBeacon);

},{"../namespace":14}]},{},[2]);

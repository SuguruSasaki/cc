(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.C2App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('../namespace.es6');

var _GL = require('../gl/GL.es6');

var _AsyncCommand = require('../command/AsyncCommand.es6');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var C2App = exports.C2App = function () {

    /**
     * Constractor
     * @param stageID HTML上のcanvasのID
     */
    function C2App(stageID) {
        _classCallCheck(this, C2App);

        this.stage = document.getElementById(stageID);
        this.gl = new _GL.GL(this.getContext());
    }

    /**
     * Set fullscreen
     */


    _createClass(C2App, [{
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
    }]);

    return C2App;
}();

(0, _namespace.namespace)("C2App", C2App);

},{"../command/AsyncCommand.es6":3,"../gl/GL.es6":9,"../namespace.es6":10}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.C2 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('./namespace.es6');

var _C2App = require('./app/C2App.es6');

var _Command = require('./command/Command.es6');

var _AsyncCommand = require('./command/AsyncCommand.es6');

var _ProcessCommand = require('./command/ProcessCommand.es6');

var _Loader = require('./net/Loader.es6');

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

},{"./app/C2App.es6":1,"./command/AsyncCommand.es6":3,"./command/Command.es6":4,"./command/ProcessCommand.es6":5,"./namespace.es6":10,"./net/Loader.es6":11}],3:[function(require,module,exports){
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

},{"../namespace.es6":10,"../utils/Delegate.es6":12,"./Command.es6":4}],4:[function(require,module,exports){
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

},{"../events/Event.es6":6,"../events/EventDispatcher.es6":7,"../namespace.es6":10}],5:[function(require,module,exports){
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
                //super.execute();
            }
        }
    }]);

    return ProcessCommand;
}(_Command2.Command);

(0, _namespace.namespace)("ProcessCommand", ProcessCommand);

},{"../namespace.es6":10,"../utils/Delegate.es6":12,"./Command.es6":4}],6:[function(require,module,exports){
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

},{"../namespace.es6":10}],7:[function(require,module,exports){
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

(0, _namespace.namespace)("EventDispatcher", EventDispatcher);

},{"../namespace.es6":10}],8:[function(require,module,exports){
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

},{"../namespace.es6":10}],9:[function(require,module,exports){
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
        key: "clearStage",
        value: function clearStage() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }
    }]);

    return GL;
}();

(0, _namespace.namespace)("GL", GL);

},{"../namespace":10}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"../events/Event.es6":6,"../events/EventDispatcher.es6":7,"../events/IOErrorEvent.es6":8,"../namespace.es6":10,"../utils/Delegate.es6":12}],12:[function(require,module,exports){
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

},{"../namespace.es6":10}]},{},[2]);

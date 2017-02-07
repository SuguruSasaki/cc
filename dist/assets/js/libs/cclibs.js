(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.C2App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('../namespace.es6');

var _GL = require('../gl/GL.es6');

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

},{"../gl/GL.es6":3,"../namespace.es6":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.C2 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('./namespace.es6');

var _C2App = require('./app/C2App.es6');

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

},{"./app/C2App.es6":1,"./namespace.es6":4}],3:[function(require,module,exports){
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

},{"../namespace":4}],4:[function(require,module,exports){
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

},{}]},{},[2]);

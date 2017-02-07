(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CCApp = undefined;

var _namespace = require("../namespace.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CCApp = exports.CCApp = function CCApp() {
    _classCallCheck(this, CCApp);

    console.log("CCApp");
};

(0, _namespace.namespace)("CCApp", CCApp);

},{"../namespace.es6":3}],2:[function(require,module,exports){
'use strict';

var _Delegate = require('./utils/Delegate.es6');

var _CCApp = require('./app/CCApp.es6');

},{"./app/CCApp.es6":1,"./utils/Delegate.es6":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"../namespace.es6":3}]},{},[2]);

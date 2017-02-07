/**
 * setting namespace
 */
var global = ('global', eval)('this');
var moduleName = "CC";
export var namespace = function(className, myClass){
    global[moduleName] = (global[moduleName]) ? global[moduleName] : {};
    global[moduleName][className] = myClass;
};

/**
 * setting global class
 * @param className
 * @param myClass
 */
export var namespace_global = function(className, myClass){
  global[className] = myClass;
};

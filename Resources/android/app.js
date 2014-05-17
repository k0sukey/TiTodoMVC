(function(tirequire,__dirname,__filename){var module={exports:{}};var exports = module.exports;tirequire.main=module;module.id=".";module.loaded=false;module.filename=__filename;var require=tirequire("node_modules/ti-commonjs/lib/ti-commonjs")(__dirname,module);module.require=require;var Alloy = tirequire("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Collections.todo = Alloy.createCollection("todo");

Alloy.createController("index");
module.loaded=true;})(require,"/","/app.js");
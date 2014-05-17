(function(tirequire,__dirname,__filename){module.id=__filename;module.loaded=false;module.filename=__filename;var require=tirequire("node_modules/ti-commonjs/lib/ti-commonjs")(__dirname,module);module.require=require;exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            todo: "text not null",
            done: "numeric default 0 not null",
            created_at: "text default '0000-00-00 00:00:00' not null",
            updated_at: "text default '0000-00-00 00:00:00' not null"
        },
        adapter: {
            type: "sql",
            collection_name: "todo",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = tirequire("alloy"), _ = tirequire("alloy/underscore")._, model, collection;

model = Alloy.M("todo", exports.definition, []);

collection = Alloy.C("todo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;
module.loaded=true;})(require,"/alloy/models","/alloy/models/Todo.js");
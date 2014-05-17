(function(tirequire,__dirname,__filename){module.id=__filename;module.loaded=false;module.filename=__filename;var require=tirequire("node_modules/ti-commonjs/lib/ti-commonjs")(__dirname,module);module.require=require;function Controller() {
    function __alloyId15(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId15.opts || {};
        var models = doFilter(__alloyId14);
        var len = models.length;
        var __alloyId10 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = doTransform(__alloyId11);
            var __alloyId13 = {
                properties: {
                    height: 44,
                    selectionStyle: Ti.UI.iPhone.ListViewCellSelectionStyle.NONE
                },
                template: "todolist",
                done: {
                    todoId: "undefined" != typeof __alloyId11.__transform["id"] ? __alloyId11.__transform["id"] : __alloyId11.get("id"),
                    color: "undefined" != typeof __alloyId11.__transform["done"] ? __alloyId11.__transform["done"] : __alloyId11.get("done")
                },
                todo: {
                    todoId: "undefined" != typeof __alloyId11.__transform["id"] ? __alloyId11.__transform["id"] : __alloyId11.get("id"),
                    value: "undefined" != typeof __alloyId11.__transform["todo"] ? __alloyId11.__transform["todo"] : __alloyId11.get("todo")
                }
            };
            __alloyId10.push(__alloyId13);
        }
        opts.animation ? $.__views.__alloyId9.setItems(__alloyId10, opts.animation) : $.__views.__alloyId9.setItems(__alloyId10);
    }
    function todofetch() {
        todo.fetch({
            success: function(_collection) {
                var itemsleft = 0;
                toggleall = false;
                _collection.each(function(_model) {
                    var json = _model.toJSON();
                    if (0 === parseInt(json.done, 10)) {
                        itemsleft++;
                        toggleall = true;
                    }
                });
                $.toggleall.applyProperties({
                    color: toggleall ? "#d9d9d9" : "#737373"
                });
                $.window.applyProperties({
                    title: L("todos") + " - " + itemsleft + " " + L("items_left")
                });
            }
        });
    }
    function doTransform(_model) {
        var json = _model.toJSON();
        json.done = 0 === parseInt(json.done, 10) ? "#d9d9d9" : "#85ada7";
        return json;
    }
    function doFilter(_collection) {
        return _collection.filter(function(_model) {
            var json = _model.toJSON();
            if (0 === activestate) return true;
            if (1 === activestate && 0 === parseInt(json.done, 10)) return true;
            if (2 === activestate && 1 === parseInt(json.done, 10)) return true;
            return false;
        });
    }
    function doToggleall() {
        todo.each(function(_model) {
            _model.set({
                done: toggleall ? 1 : 0
            });
            _model.save();
        });
        todofetch();
    }
    function doToggle(e) {
        e.cancelBubble = true;
        var model = todo.get(e.source.todoId);
        model.set({
            done: !parseInt(model.get("done"), 10)
        });
        model.save(null, {
            success: function() {
                todofetch();
            }
        });
    }
    function doEdit(e) {
        e.cancelBubble = true;
        e.source.applyProperties({
            editable: true
        });
        prevtodo = e.source.getValue();
        e.source.focus();
    }
    function doEdited(e) {
        e.cancelBubble = true;
        e.source.applyProperties({
            editable: false
        });
        e.source.blur();
        if ("" === e.source.getValue()) {
            e.source.applyProperties({
                value: prevtodo
            });
            return;
        }
        var model = todo.get(e.source.todoId);
        model.set({
            todo: e.source.getValue(),
            updated_at: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        model.save(null, {
            success: function() {
                todofetch();
            }
        });
    }
    function doDelete(e) {
        e.cancelBubble = true;
        var model = todo.get(e.source.todoId);
        model.destroy({
            success: function() {
                todofetch();
            }
        });
    }
    function doTab(e) {
        activestate = e.index;
        todofetch();
    }
    tirequire("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "window",
        title: "todos - 0 items left"
    });
    $.__views.header = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 44,
        backgroundColor: "#f6f6f6",
        id: "header"
    });
    $.__views.toggleall = Ti.UI.createLabel({
        top: 0,
        bottom: 0,
        left: 0,
        width: 44,
        height: 44,
        color: "#d9d9d9",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        text: "✓",
        id: "toggleall"
    });
    $.__views.header.add($.__views.toggleall);
    doToggleall ? $.__views.toggleall.addEventListener("click", doToggleall) : __defers["$.__views.toggleall!click!doToggleall"] = true;
    $.__views.inputtodo = Ti.UI.createTextField({
        top: 0,
        right: 0,
        bottom: 0,
        left: 50,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        paddingRight: 10,
        hintText: L("what_needs_to_be_done"),
        id: "inputtodo"
    });
    $.__views.header.add($.__views.inputtodo);
    var __alloyId1 = {};
    var __alloyId4 = [];
    var __alloyId6 = {
        type: "Ti.UI.Label",
        bindId: "done",
        properties: {
            top: 0,
            bottom: 0,
            left: 0,
            width: 44,
            height: 44,
            color: "#d9d9d9",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
            text: "✓",
            bindId: "done"
        },
        events: {
            click: doToggle
        }
    };
    __alloyId4.push(__alloyId6);
    var __alloyId8 = {
        type: "Ti.UI.TextField",
        bindId: "todo",
        properties: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 50,
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            paddingRight: 10,
            editable: false,
            bindId: "todo"
        },
        events: {
            dblclick: doEdit,
            swipe: doDelete,
            "return": doEdited
        }
    };
    __alloyId4.push(__alloyId8);
    var __alloyId3 = {
        properties: {
            name: "todolist"
        },
        childTemplates: __alloyId4
    };
    __alloyId1["todolist"] = __alloyId3;
    $.__views.__alloyId9 = Ti.UI.createListSection({
        id: "__alloyId9"
    });
    var __alloyId14 = Alloy.Collections["todo"] || todo;
    __alloyId14.on("fetch destroy change add remove reset", __alloyId15);
    var __alloyId16 = [];
    __alloyId16.push($.__views.__alloyId9);
    $.__views.todos = Ti.UI.createListView({
        top: 0,
        right: 0,
        bottom: 44,
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fcfcfc",
        sections: __alloyId16,
        templates: __alloyId1,
        headerView: $.__views.header,
        id: "todos",
        defaultItemTemplate: "todolist"
    });
    $.__views.window.add($.__views.todos);
    $.__views.footer = Ti.UI.createView({
        right: 0,
        bottom: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: 44,
        id: "footer"
    });
    $.__views.window.add($.__views.footer);
    var __alloyId18 = [];
    var __alloyId19 = {
        title: L("label_all"),
        ns: "Alloy.Abstract"
    };
    __alloyId18.push(__alloyId19);
    var __alloyId20 = {
        title: L("label_active"),
        ns: "Alloy.Abstract"
    };
    __alloyId18.push(__alloyId20);
    var __alloyId21 = {
        title: L("label_completed"),
        ns: "Alloy.Abstract"
    };
    __alloyId18.push(__alloyId21);
    $.__views.tab = Ti.UI.iOS.createTabbedBar({
        index: 0,
        labels: __alloyId18,
        id: "tab"
    });
    $.__views.footer.add($.__views.tab);
    doTab ? $.__views.tab.addEventListener("click", doTab) : __defers["$.__views.tab!click!doTab"] = true;
    $.__views.index = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.window,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {
        __alloyId14.off("fetch destroy change add remove reset", __alloyId15);
    };
    _.extend($, $.__views);
    var lodash = require("lodash"), moment = require("moment");
    var todo = Alloy.Collections.todo;
    todo.comparator = function(_model) {
        return -moment(_model.get("created_at")).unix();
    };
    var activestate = 0, prevtodo = "", toggleall = false;
    $.inputtodo.addEventListener("return", lodash.debounce(function() {
        $.inputtodo.blur();
        if ("" === $.inputtodo.getValue()) return;
        var model = Alloy.createModel("todo", {
            todo: $.inputtodo.getValue(),
            created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        todo.add(model);
        model.save(null, {
            success: function() {
                $.inputtodo.applyProperties({
                    value: ""
                });
                todofetch();
            }
        });
    }), 1e3, true);
    $.todos.addEventListener("itemclick", lodash.debounce(function() {
        $.inputtodo.blur();
    }), 1e3, true);
    $.index.addEventListener("open", function() {
        $.index.title = L("todos") + " - o " + L("items_left");
        todofetch();
    });
    $.index.open();
    __defers["$.__views.toggleall!click!doToggleall"] && $.__views.toggleall.addEventListener("click", doToggleall);
    __defers["$.__views.tab!click!doTab"] && $.__views.tab.addEventListener("click", doTab);
    _.extend($, exports);
}

var Alloy = tirequire("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
module.loaded=true;})(require,"/alloy/controllers","/alloy/controllers/index.js");
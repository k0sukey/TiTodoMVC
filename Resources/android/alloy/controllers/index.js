(function(tirequire,__dirname,__filename){module.id=__filename;module.loaded=false;module.filename=__filename;var require=tirequire("node_modules/ti-commonjs/lib/ti-commonjs")(__dirname,module);module.require=require;function Controller() {
    function __alloyId7() {
        $.__views.index.removeEventListener("open", __alloyId7);
        if ($.__views.index.activity) $.__views.index.activity.onCreateOptionsMenu = function(e) {
            var __alloyId2 = {
                title: "All",
                id: "__alloyId1"
            };
            $.__views.__alloyId1 = e.menu.add(_.pick(__alloyId2, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId1.applyProperties(_.omit(__alloyId2, Alloy.Android.menuItemCreateArgs));
            doAll ? $.__views.__alloyId1.addEventListener("click", doAll) : __defers["$.__views.__alloyId1!click!doAll"] = true;
            var __alloyId4 = {
                title: "Active",
                id: "__alloyId3"
            };
            $.__views.__alloyId3 = e.menu.add(_.pick(__alloyId4, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId3.applyProperties(_.omit(__alloyId4, Alloy.Android.menuItemCreateArgs));
            doActive ? $.__views.__alloyId3.addEventListener("click", doActive) : __defers["$.__views.__alloyId3!click!doActive"] = true;
            var __alloyId6 = {
                title: "Completed",
                id: "__alloyId5"
            };
            $.__views.__alloyId5 = e.menu.add(_.pick(__alloyId6, Alloy.Android.menuItemCreateArgs));
            $.__views.__alloyId5.applyProperties(_.omit(__alloyId6, Alloy.Android.menuItemCreateArgs));
            doCompleted ? $.__views.__alloyId5.addEventListener("click", doCompleted) : __defers["$.__views.__alloyId5!click!doCompleted"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function __alloyId23(e) {
        if (e && e.fromAdapter) return;
        var opts = __alloyId23.opts || {};
        var models = doFilter(__alloyId22);
        var len = models.length;
        var __alloyId18 = [];
        for (var i = 0; len > i; i++) {
            var __alloyId19 = models[i];
            __alloyId19.__transform = doTransform(__alloyId19);
            var __alloyId21 = {
                properties: {
                    height: 44
                },
                template: "todolist",
                done: {
                    todoId: "undefined" != typeof __alloyId19.__transform["id"] ? __alloyId19.__transform["id"] : __alloyId19.get("id"),
                    color: "undefined" != typeof __alloyId19.__transform["done"] ? __alloyId19.__transform["done"] : __alloyId19.get("done")
                },
                todo: {
                    todoId: "undefined" != typeof __alloyId19.__transform["id"] ? __alloyId19.__transform["id"] : __alloyId19.get("id"),
                    value: "undefined" != typeof __alloyId19.__transform["todo"] ? __alloyId19.__transform["todo"] : __alloyId19.get("todo")
                }
            };
            __alloyId18.push(__alloyId21);
        }
        opts.animation ? $.__views.__alloyId17.setItems(__alloyId18, opts.animation) : $.__views.__alloyId17.setItems(__alloyId18);
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
                $.index.activity.actionBar.title = L("todos") + " - " + itemsleft + " " + L("items_left");
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
        var model = todo.get(e.section.getItemAt(e.itemIndex).done.todoId);
        model.set({
            done: parseInt(model.get("done"), 10) ? 0 : 1
        });
        model.save(null, {
            success: function() {
                todofetch();
            }
        });
    }
    function doEdit(e) {
        e.cancelBubble = true;
        var item = e.section.getItemAt(e.itemIndex);
        item.todo.editable = true;
        e.section.updateItemAt(e.itemIndex, item);
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
        var model = todo.get(e.section.getItemAt(e.itemIndex).todo.todoId);
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
        var model = todo.get(e.section.getItemAt(e.itemIndex).todo.todoId);
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
    function doAll() {
        doTab({
            index: 0
        });
    }
    function doActive() {
        doTab({
            index: 1
        });
    }
    function doCompleted() {
        doTab({
            index: 2
        });
    }
    tirequire("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#fff",
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN | Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE,
        title: "todos - 0 items left",
        exitOnClose: "true",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.index.addEventListener("open", __alloyId7);
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
        color: "#333",
        hintText: "What needs to be done?",
        id: "inputtodo"
    });
    $.__views.header.add($.__views.inputtodo);
    var __alloyId9 = {};
    var __alloyId12 = [];
    var __alloyId14 = {
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
    __alloyId12.push(__alloyId14);
    var __alloyId16 = {
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
            color: "#333",
            editable: false,
            bindId: "todo"
        },
        events: {
            dblclick: doEdit,
            swipe: doDelete,
            "return": doEdited
        }
    };
    __alloyId12.push(__alloyId16);
    var __alloyId11 = {
        properties: {
            name: "todolist"
        },
        childTemplates: __alloyId12
    };
    __alloyId9["todolist"] = __alloyId11;
    $.__views.__alloyId17 = Ti.UI.createListSection({
        id: "__alloyId17"
    });
    var __alloyId22 = Alloy.Collections["todo"] || todo;
    __alloyId22.on("fetch destroy change add remove reset", __alloyId23);
    var __alloyId24 = [];
    __alloyId24.push($.__views.__alloyId17);
    $.__views.todos = Ti.UI.createListView({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#fcfcfc",
        separatorColor: "#bcbac1",
        sections: __alloyId24,
        templates: __alloyId9,
        headerView: $.__views.header,
        id: "todos",
        defaultItemTemplate: "todolist"
    });
    $.__views.index.add($.__views.todos);
    exports.destroy = function() {
        __alloyId22.off("fetch destroy change add remove reset", __alloyId23);
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
    __defers["$.__views.__alloyId1!click!doAll"] && $.__views.__alloyId1.addEventListener("click", doAll);
    __defers["$.__views.__alloyId3!click!doActive"] && $.__views.__alloyId3.addEventListener("click", doActive);
    __defers["$.__views.__alloyId5!click!doCompleted"] && $.__views.__alloyId5.addEventListener("click", doCompleted);
    __defers["$.__views.toggleall!click!doToggleall"] && $.__views.toggleall.addEventListener("click", doToggleall);
    _.extend($, exports);
}

var Alloy = tirequire("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;
module.loaded=true;})(require,"/alloy/controllers","/alloy/controllers/index.js");
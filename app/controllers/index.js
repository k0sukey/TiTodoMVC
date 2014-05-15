var lodash = require('lodash'),
	moment = require('moment');

var todo = Alloy.Collections.todo;
todo.comparator = function(_model) {
	return -moment(_model.get('created_at')).unix();
};

var activestate = 0,
	prevtodo = '',
	toggleall = false;

function todofetch() {
	todo.fetch({
		success: function(_collection){
			var itemsleft = 0;
			toggleall = false;

			_collection.each(function(_model){
				var json = _model.toJSON();
				if (parseInt(json.done, 10) === 0) {
					itemsleft++;
					toggleall = true;
				}
			});

			$.toggleall.applyProperties({
				color: toggleall ? '#d9d9d9' : '#737373'
			});

			$.window.applyProperties({
				title: 'todos - ' + itemsleft + ' items left'
			});
		}
	});
}

function doTransform(_model) {
	var json = _model.toJSON();
	json.done = parseInt(json.done, 10) === 0 ? '#d9d9d9' : '#85ada7';
	return json;
}

function doFilter(_collection) {
	return _collection.filter(function(_model){
		var json = _model.toJSON();

		if (activestate === 0) {
			return true;
		} else if (activestate === 1 &&
			parseInt(json.done, 10) === 0) {
			return true;
		} else if (activestate === 2 &&
			parseInt(json.done, 10) === 1) {
			return true;
		}

		return false;
	});
}

function doToggleall(e) {
	todo.each(function(_model){
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
		done: !parseInt(model.get('done'), 10)
	});
	model.save(null, {
		success: function(){
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

	if (e.source.getValue() === '') {
		e.source.applyProperties({
			value: prevtodo
		});
		return;
	}

	var model = todo.get(e.source.todoId);
	model.set({
		todo: e.source.getValue(),
		updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
	});
	model.save(null, {
		success: function(){
			todofetch();
		}
	});
}

function doDelete(e) {
	e.cancelBubble = true;

	var model = todo.get(e.source.todoId);
	model.destroy({
		success: function(){
			todofetch();
		}
	});
}

function doTab(e) {
	activestate = e.index;
	todofetch();
}

$.inputtodo.addEventListener('return', lodash.debounce(function(){
	$.inputtodo.blur();

	if ($.inputtodo.getValue() === '') {
		return;
	}

	var model = Alloy.createModel('todo', {
		todo: $.inputtodo.getValue(),
		created_at: moment().format('YYYY-MM-DD HH:mm:ss')
	});
	todo.add(model);
	model.save(null, {
		success: function(){
			$.inputtodo.applyProperties({
				value: ''
			});
			todofetch();
		}
	});
}), 1000, true);

$.todos.addEventListener('itemclick', lodash.debounce(function(e){
	$.inputtodo.blur();
	$.todos.deselectItem(0, e.itemIndex);
}), 1000, true);

$.index.addEventListener('open', function(){
	todofetch();
});
$.index.open();
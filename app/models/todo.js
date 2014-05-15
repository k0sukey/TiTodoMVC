exports.definition = {
	config: {
		columns: {
			id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
			todo: 'text not null',
			done: 'numeric default 0 not null',
			created_at: 'text default \'0000-00-00 00:00:00\' not null',
			updated_at: 'text default \'0000-00-00 00:00:00\' not null'
		},
		adapter: {
			type: 'sql',
			collection_name: 'todo',
			idAttribute: 'id'
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};
Ext.define('JxkpApp.model.Dept', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.grid.column.Boolean'
	],

	idProperty: 'id',

	fields: [
		{name: 'pid'},
		{name: 'id'},
		{name: 'comment'},
		{name: 'type'},
		{name: 'text'},
		{
			type: 'boolean',
			defaultValue: false,
			name: 'leaf',
			persist: 'false'
		},
		{
			name: 'iconCls'
		}
	]
});
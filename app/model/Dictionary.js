Ext.define('JxkpApp.model.Dictionary', {
extend: 'Ext.data.Model', 
	fields: [
		{name: 'ID', type: 'string'},
		{name: 'DD_ID', type: 'string'},
		{name: 'DD_VALUE', type: 'string'},
		{name: 'DD_CAPTION', type: 'string'}
	]
});
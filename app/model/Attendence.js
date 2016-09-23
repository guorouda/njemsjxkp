Ext.define('JxkpApp.model.Attendence', {
extend: 'Ext.data.Model', 
	fields: [
		{ name: 'EMP_NAME', type: 'string' },
		{ name: 'EMP_ID', type: 'string'},
		{ name: 'GXJ', type: 'float'},
		{ name: 'CJ', type: 'float'},
		{ name: 'YCCJ', type: 'float'},
		{ name: 'JHSYJ', type: 'float'},
		{ name: 'BRJ', type: 'float'},
		{ name: 'TQJ', type: 'float'},
		{ name: 'HJ', type: 'float'},
		{ name: 'SANGJ', type: 'float'},
		{ name: 'KG', type: 'float'},
		{ name: 'BJ', type: 'float'},
		{ name: 'SHIJ', type: 'float'},
		{ name: 'GJ', type: 'float'},
		{ name: 'GSJ', type: 'float'},
		{ name: 'TOTAL', type: 'float'},
		{ name: 'MEMO', type: 'string'},
		{ name: 'ATT_MONTH', type: 'date'},
		{ name: 'MODITIME', type: 'date'},
		{ name: 'DEP_ID', type: 'string'},
		{ name: 'MODILOCK', type: 'int' },
		{ name : 'IDS', type: 'string'}
	]
});
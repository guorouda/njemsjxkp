Ext.define('JxkpApp.model.Check', {
extend: 'Ext.data.Model', 
	fields: [
		{ name: 'ID', type: 'string', mapping: 'IDS' },
		{ name: 'EMP_NAME', type: 'string' },
		{ name: 'DEP_ID', type: 'string' },
		{ name: 'DEP_NAME', type: 'string' },
		{ name: 'EMP_ID', type: 'int' },
		{ name: 'ATT_MONTH', type: 'date', dateFormat : 'Y-m-d H:i:s.u'},
		{ name: 'STATION', type: 'int' },
		{ name: 'SEGMENT', type: 'string'},
		{ name: 'MONEY', type: 'float' },
		{ name: 'MEMO', type: 'string' },
		{ name: 'MODILOCK', type: 'int' }
	]
});
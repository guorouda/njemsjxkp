Ext.define('JxkpApp.model.Score', {
extend: 'Ext.data.Model', 
	fields: [
		{name: 'EMP_NAME', type: 'string' },
		{name: 'EMP_ID',  type: 'string'},
		{name: 'GZZL',  type: 'float'},
		{name: 'GZJL',  type: 'float'},
		{name: 'JZXW',  type: 'float'},
		{name: 'TOTAL',  type: 'float'},
		{name: 'MEMO',  type: 'string'},
		{name: 'ATT_MONTH',  type: 'date', dateFormat : 'Y-m-d H:i:s.u'},
		{name: 'MODITIME',  type: 'date'},
		{name: 'DEP_ID',  type: 'string'},
		{ name: 'MODILOCK', type: 'int' }
	]
});
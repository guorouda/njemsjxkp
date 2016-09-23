Ext.define('JxkpApp.model.InnerSalary_fail_log', {
extend: 'Ext.data.Model', 
	fields: [
		{ name: 'EMP_ID', type: 'string' },
		{ name: 'EVENT_ID', type: 'int' },
		{ name: 'EVENT_DESC', type: 'string'},
		{ name: 'DATA', type: 'string' },
		{ name: 'LOGTIME', type: 'date', dateFormat : 'Y-m-d H:i:s.u'}
	]
});
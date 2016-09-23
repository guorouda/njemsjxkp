Ext.define('JxkpApp.model.User', {
extend: 'Ext.data.Model', 
	fields: [
		{name: 'ID', type: 'string'},
		{name: 'EMP_ID', type: 'string'},
		{name: 'EMP_NAME', type: 'string'},
		{name: 'DEP_NAME', type: 'string'},
		{name: 'DEP_ID', type: 'string'},
		{name: 'LEV', type: 'string'},
		{name: 'SEX', type: 'string'},
		{name: 'STATION', type: 'string'},
		{name: 'SEGMENT', type: 'string'},
		{name: 'CATEGORY', type: 'string'},
		{name: 'EDU', type: 'string'},
		{name: 'BIRTHDAY', type: 'date', dateFormat : 'Y-m-d H:i:s.u'},
		{name: 'GN', type: 'date', dateFormat : 'Y-m-d H:i:s.u'},
		{name: 'RJ', type: 'date', dateFormat : 'Y-m-d H:i:s.u'},
		{name: 'PID', type: 'string'},
		{name: 'LTY', type: 'string'},
		{name: 'GWMC', type: 'string'},
		{name: 'ZJ', type: 'string'},
		{name: 'JSZW', type: 'string'},
		{name: 'JSJB', type: 'string'},
		{name: 'GWGZ', type: 'string'},
		{name: 'MEMO', type: 'string'},
		{name: 'AAA', type: 'string'}
	]
});
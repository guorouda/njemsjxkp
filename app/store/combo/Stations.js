Ext.define('JxkpApp.store.combo.Stations', {
    extend: 'Ext.data.Store', 

    autoLoad: true,

    storeId: 'combostations',

	fields: [
		{
			name: 'di_caption',
			type: 'string'
		}, 
		{
			name: 'di_value',
			type: 'String'
		},{
			name: 'dd_id',
			type: 'String'
		}
	],
	
	proxy: {
        type: 'ajax',
        url: '/jxkpserver/DeptAction.do?action=getDd_item&field=depttype',
        reader: {
            type: 'json',
            totalProperty: "results",
			root: "rows"////,
 //           idProperty: 'di_value'
        }
    }	
});
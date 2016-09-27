Ext.define('JxkpApp.store.combo.Stations', {
    extend: 'Ext.data.Store', 

    autoLoad: false,

	fields: [{
			name: 'di_caption',
			type: 'string'
		}, 
		{
			name: 'di_value',
			type: 'String'
	}],
	
	proxy: {
        type: 'ajax',
        url: '/jxkpserver/DeptAction.do?action=getDd_item&field=station',
        reader: {
            type: 'json',
            totalProperty: "results",
			root: "rows"////,
 //           idProperty: 'di_value'
        }
    }	
});
Ext.define('JxkpApp.store.Segments', {
    extend: 'Ext.data.Store', 

    autoLoad: true,

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
        url: '/jxkpserver/DeptAction.do?action=getDd_item&field=segment',
        reader: {
            type: 'json',
            totalProperty: "results",
			root: "rows",
            idProperty: 'di_value'
        }
    }	
});
Ext.define('JxkpApp.store.combo.Depts', {
    extend: 'Ext.data.Store', 

    autoLoad: true,

	fields: [{
			name: 'di_caption',
			type: 'string',
			mapping: 'text'
		}, 
		{
			name: 'di_value',
			type: 'String',
			mapping: 'id'
	}],
	
	proxy: {
        type: 'ajax',
        url: '/jxkpserver/DeptAction.do?action=getAll',
        reader: {
            type: 'json',
            root: "users"
        }
    }	
});
Ext.define('JxkpApp.store.Dictoinarys', {
    extend: 'Ext.data.Store', 
    model: 'JxkpApp.model.Dictoinary',
    autoLoad: false,
	proxy: {
	    type: 'ajax',
	    api: {
	        create: '/jxkpserver/UserAction.do?action=addUser',
	        read: '/jxkpserver/UserAction.do?action=getUser',
	        update: '/jxkpserver/UserAction.do?action=updateUser'

	    }, 
	    reader: {
	        type: 'json', 
	        root: 'users'//,
	        // successProperty: 'success'    
		},
		writer: {
			type: 'json',
			encode: true,  
	        allowSingle: true, // 
	        root: "data"
		}
	}
});
Ext.define('JxkpApp.store.Authorizations', {
    extend: 'Ext.data.Store', 
    model: 'JxkpApp.model.User',
    autoLoad: false,
	proxy: {
	    type: 'ajax',
	    api: {
	        create: '/jxkpserver/AuthorizationAction.do?action=addAuthorization',
	        read: '/jxkpserver/AuthorizationAction.do?action=getAuthorization',
	        update: '/jxkpserver/AuthorizationAction.do?action=updateAuthorization',
	        destroy: '/jxkpserver/AuthorizationAction.do?action=destroyAuthorization'
	    }, 
	    reader: {
	        type: 'json', 
	        root: 'users'//,
	        // successProperty: 'success'    
		},
		writer: {
			type: 'json',
			encode: true,  
	        allowSingle: false, // 
	        root: "data"
		}
	}
});
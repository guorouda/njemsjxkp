Ext.define('JxkpApp.store.Checks', {
    extend: 'Ext.data.Store', 
    model: 'JxkpApp.model.Check',
    autoLoad: false,
	proxy: {
	    type: 'ajax',
	    api: {
	        // read: 'resources/data/users.json', 
	        read: '/jxkpserver/UserAction.do?action=getCheck',
	        update: 'resources/data/updateUsers.json'
	    }, 
	    reader: {
	        type: 'json', 
	        root: 'users'
	        // successProperty: 'success'    
		},
		writer: {
			type: 'json'
		}
	}
});
Ext.define('JxkpApp.store.Lists', {
    extend: 'Ext.data.Store', 
    model: 'JxkpApp.model.List',
    autoLoad: false,
	proxy: {
	    type: 'ajax',
	    api: {
	        // read: 'resources/data/users.json', 
	        read: '/jxkpserver/UserAction.do?action=getInnerSalary',
	        update: 'resources/data/updateUsers.json'
	    }, 
	    reader: {
	        type: 'json', 
	        root: 'users',
	        successProperty: 'success'    
		},
		writer: {
			type: 'json'
		}
	}
});
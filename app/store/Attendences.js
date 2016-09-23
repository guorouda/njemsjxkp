Ext.define('JxkpApp.store.Attendences', {
    extend: 'Ext.data.Store', 
    model: 'JxkpApp.model.Attendence',
    autoLoad: false,
	proxy: {
	    type: 'ajax',
	    api: {
	        // read: 'resources/data/users.json', 
	        read: '/jxkpserver/UserAction.do?action=getAttendence',
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
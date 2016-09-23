Ext.define('JxkpApp.store.PersonSalary', {
    extend: 'Ext.data.Store', 
    model: 'JxkpApp.model.Salary',
    autoLoad: false,
	proxy: {
	    type: 'ajax',
	    timeout: 600000,
	    api: {
	        // read: 'resources/data/users.json', 
	        read: '/jxkpserver/UserAction.do?action=getPersonSalary',
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
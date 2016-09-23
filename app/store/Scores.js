Ext.define('JxkpApp.store.Scores', {
    extend: 'Ext.data.Store', 
    model: 'JxkpApp.model.Score',
    autoLoad: false,
	proxy: {
	    type: 'ajax',
	    api: {
	        // read: 'resources/data/users.json', 
	        read: '/jxkpserver/UserAction.do?action=getScore',
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
Ext.define('JxkpApp.store.SearchUsers', {
    extend: 'Ext.data.Store', 
    model: 'JxkpApp.model.User',

    pageSize: 10,

	proxy: {
	    type: 'ajax',
		url : '/jxkpserver/UserAction.do?action=searchUser', 
	    reader: {
	        type: 'json',
            root: 'users',
            totalProperty: 'totalCount'    
		}
	}
});
Ext.define('JxkpApp.store.InnerSalary_fail_logs', {
    extend: 'Ext.data.Store', 
    model: 'JxkpApp.model.InnerSalary_fail_log',
    autoLoad: false,
	proxy: {
	    type: 'ajax',
	    api: {	        
	        read: '/jxkpserver/UserAction.do?action=getInnerSalary_fail_log'      
	    }, 
	    reader: {
	        type: 'json', 
	        root: 'users'//,
	        // successProperty: 'success'    
		}
	}
});
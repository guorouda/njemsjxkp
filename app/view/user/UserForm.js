Ext.define('JxkpApp.view.user.UserForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.userformlist',

	requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.user.MyForm',
        'JxkpApp.view.user.User'
    ],

    layout: 'border',
    title: '人员',
    itemId: 'userform',
    items: [{                
	    xtype: 'userlist',
	    region: 'center'
    },
    {   
    	xtype: 'usermyform',
        region: 'east',
	    split: true,
	    collapsible: true
	}]

});
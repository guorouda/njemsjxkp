Ext.define('JxkpApp.view.user.UserAuthorizationForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.userauthorizationformlist',

	requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.user.MyFormAuthorization',
        'JxkpApp.view.user.User'
    ],

    layout: 'border',
    title: '人员',
    // itemId: 'userform',
    items: [{                
	    xtype: 'userauthorizationlist',
	    region: 'center'
    },
    {   
    	xtype: 'usermyformauthorization',
        region: 'east',
	    split: true,
	    collapsible: true
	}]

});
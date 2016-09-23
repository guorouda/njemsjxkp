Ext.define('JxkpApp.view.crowdshare.RegisterWithForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.registerwithformlist',

	requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.crowdshare.RegisterForm',
        'JxkpApp.view.crowdshare.Register'
    ],

    layout: 'border',
    title: '人员',
    itemId: 'registerwithform',
    items: [{                
	    xtype: 'registerlist',
	    region: 'center'
    },
    {   
    	xtype: 'registerformlist',
        region: 'east',
	    split: true,
	    collapsible: true
	}]

});
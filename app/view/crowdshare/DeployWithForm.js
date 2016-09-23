Ext.define('JxkpApp.view.crowdshare.DeployWithForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.deploywithformlist',

	requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.crowdshare.DeployForm',
        'JxkpApp.view.crowdshare.Deploy'
    ],

    layout: 'border',
    title: '发布',
    itemId: 'deploywithform',
    items: [{                
	    xtype: 'deploylist',
	    region: 'center'
    },
    {   
    	xtype: 'deployformlist',
        region: 'east',
	    split: true,
	    collapsible: true
	}]

});
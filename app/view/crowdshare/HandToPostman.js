Ext.define('JxkpApp.view.crowdshare.HandToPostman', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.handtopostmanlist',

	requires:[
        'Ext.layout.container.Border',
        'JxkpApp.view.crowdshare.HandToPostmanAll',
        'JxkpApp.view.crowdshare.HandToPostmanDetail'
    ],

    layout: 'border',
    title: '发布',
    itemId: 'handtopostman',
    items: [{                
	    xtype: 'handtopostmanall',
        flex: 1,
	    region: 'center'
    },
    {   
    	xtype: 'handtopostmandetail',
        region: 'south',
        flex: 2,
	    split: true
	}]

});